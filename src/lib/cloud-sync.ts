import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  type Firestore,
} from "firebase/firestore";
import type { TestVersion } from "@/lib/types";
import {
  loadProgress,
  saveProgress,
  type VersionProgress,
} from "@/lib/progress";

const DOC = "progress";

export function isCloudSyncConfigured(): boolean {
  return isFirebaseConfigured();
}

function auth() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

function db(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
}

export function watchAuth(cb: (user: User | null) => void): () => void {
  const a = auth();
  if (!a) {
    cb(null);
    return () => undefined;
  }
  return onAuthStateChanged(a, cb);
}

export async function signIn(email: string, password: string) {
  const a = auth();
  if (!a) throw new Error("unavailable");
  await signInWithEmailAndPassword(a, email, password);
}

export async function signUp(email: string, password: string) {
  const a = auth();
  if (!a) throw new Error("unavailable");
  await createUserWithEmailAndPassword(a, email, password);
}

export async function signOutUser() {
  const a = auth();
  if (!a) return;
  await signOut(a);
}

export async function resetPassword(email: string) {
  const a = auth();
  if (!a) throw new Error("unavailable");
  await sendPasswordResetEmail(a, email);
}

/** Deletes cloud progress then the Auth user. May require recent login. */
export async function deleteAccount(user: User) {
  const firestore = db();
  if (firestore) {
    try {
      await deleteDoc(doc(firestore, "users", user.uid, "data", DOC));
    } catch {
      // continue — Auth delete still removes access
    }
  }
  await deleteUser(user);
}

type CloudBlob = Partial<Record<TestVersion, VersionProgress>>;

function mergeProgress(
  local: VersionProgress,
  remote: VersionProgress
): VersionProgress {
  const questions = { ...remote.questions };
  for (const [id, stats] of Object.entries(local.questions)) {
    const prev = questions[id];
    if (!prev || stats.lastSeenAt >= prev.lastSeenAt) {
      questions[id] = stats;
    }
  }
  return {
    questions,
    streak: Math.max(local.streak, remote.streak),
    bestStreak: Math.max(local.bestStreak, remote.bestStreak),
    simulationsPassed: Math.max(
      local.simulationsPassed,
      remote.simulationsPassed
    ),
    simulationsTaken: Math.max(local.simulationsTaken, remote.simulationsTaken),
    updatedAt: Math.max(local.updatedAt, remote.updatedAt),
  };
}

/** Pull remote, merge with local, write both ways. */
export async function syncProgress(uid: string): Promise<void> {
  const firestore = db();
  if (!firestore) throw new Error("unavailable");
  const ref = doc(firestore, "users", uid, "data", DOC);
  const snap = await getDoc(ref);
  const remote = (snap.exists() ? (snap.data() as CloudBlob) : {}) ?? {};
  const versions: TestVersion[] = ["2008", "2025"];
  const merged: CloudBlob = {};
  for (const v of versions) {
    const local = loadProgress(v);
    const rem = remote[v];
    const next = rem ? mergeProgress(local, rem) : local;
    merged[v] = next;
    saveProgress(v, next);
  }
  await setDoc(ref, { ...merged, syncedAt: Date.now() }, { merge: true });
}
