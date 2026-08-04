"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import type { Dictionary } from "@/lib/dictionary";
import {
  deleteAccount,
  isCloudSyncConfigured,
  resetPassword,
  signIn,
  signOutUser,
  signUp,
  syncProgress,
  watchAuth,
} from "@/lib/cloud-sync";

export default function AccountSyncPanel({ dict }: { dict: Dictionary }) {
  const configured = isCloudSyncConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) return;
    return watchAuth(setUser);
  }, [configured]);

  if (!configured) {
    return (
      <aside className="border border-line bg-surface px-4 py-4 sm:px-5">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
          {dict.accountSyncTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {dict.accountUnavailable}
        </p>
      </aside>
    );
  }

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      await fn();
    } catch {
      setErr(dict.accountSyncError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="border border-line bg-surface px-4 py-4 sm:px-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
        {dict.accountSyncTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{dict.accountSyncLead}</p>

      {user ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink">
            {dict.accountSignedInAs}{" "}
            <span className="font-semibold">{user.email}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="gw-btn gw-btn-primary"
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  await syncProgress(user.uid);
                  setMsg(dict.accountSynced);
                })
              }
            >
              {dict.accountSyncNow}
            </button>
            <button
              type="button"
              className="gw-btn gw-btn-secondary"
              disabled={busy}
              onClick={() => void run(() => signOutUser())}
            >
              {dict.accountSignOut}
            </button>
            <button
              type="button"
              className="gw-btn gw-btn-secondary text-miss"
              disabled={busy}
              onClick={() => {
                if (!window.confirm(dict.accountDeleteConfirm)) return;
                void run(async () => {
                  await deleteAccount(user);
                  setMsg(dict.accountDeleted);
                });
              }}
            >
              {dict.accountDelete}
            </button>
          </div>
        </div>
      ) : (
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void run(() => signIn(email, password));
          }}
        >
          <label className="block text-sm font-semibold text-ink sm:col-span-1">
            {dict.accountEmail}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-[var(--radius)] border border-line bg-paper px-3 py-2.5 text-base font-normal outline-none focus:border-signal"
            />
          </label>
          <label className="block text-sm font-semibold text-ink sm:col-span-1">
            {dict.accountPassword}
            <input
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-[var(--radius)] border border-line bg-paper px-3 py-2.5 text-base font-normal outline-none focus:border-signal"
            />
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="submit" className="gw-btn gw-btn-primary" disabled={busy}>
              {dict.accountSignIn}
            </button>
            <button
              type="button"
              className="gw-btn gw-btn-secondary"
              disabled={busy}
              onClick={() => void run(() => signUp(email, password))}
            >
              {dict.accountCreate}
            </button>
            <button
              type="button"
              className="gw-btn gw-btn-secondary"
              disabled={busy || !email.trim()}
              onClick={() =>
                void run(async () => {
                  await resetPassword(email.trim());
                  setMsg(dict.accountResetSent);
                })
              }
            >
              {dict.accountResetPassword}
            </button>
          </div>
        </form>
      )}

      {msg ? (
        <p className="mt-3 text-sm font-semibold text-signal" role="status">
          {msg}
        </p>
      ) : null}
      {err ? (
        <p className="mt-3 text-sm text-miss" role="alert">
          {err}
        </p>
      ) : null}
    </aside>
  );
}
