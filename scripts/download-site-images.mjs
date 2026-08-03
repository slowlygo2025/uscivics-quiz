/**
 * Download curated royalty-free images into public/images/
 * Usage: node scripts/download-site-images.mjs
 *
 * Sources: Unsplash (https://unsplash.com/license) and Wikimedia Commons.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "images");

/** Unsplash: w=1800 for heroes, q=80. Wikimedia: fixed commons URLs. */
const FILES = [
  {
    path: "hero/home.jpg",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1800&q=80",
    note: "Unsplash — studying at desk (Green Chameleon)",
  },
  {
    path: "about/study-group.jpg",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — study group (Hannah Olinger)",
  },
  {
    path: "english/writing.jpg",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — writing (Unseen Studio)",
  },
  {
    path: "learn/hub.jpg",
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — stack of books",
  },
  {
    path: "learn/test-version.jpg",
    url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — planner / calendar (Eric Rothermel)",
  },
  {
    path: "learn/senior.jpg",
    url: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — older adult reading",
  },
  {
    path: "learn/interview.jpg",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — calm workplace conversation (Austin Distel)",
  },
  {
    path: "learn/study.jpg",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=75&crop=entropy",
    note: "Unsplash — study desk (crop variant)",
  },
  {
    path: "learn/english.jpg",
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — open book reading",
  },
  {
    path: "learn/officials.jpg",
    url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — map (Andrew Stutesman)",
  },
  {
    path: "learn/oath.jpg",
    url: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — American flag soft light",
  },
  {
    path: "states/texas.jpg",
    url: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — Texas city / civic architecture",
  },
  {
    path: "states/florida.jpg",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — Florida beach palms atmosphere",
  },
  {
    path: "states/new-york.jpg",
    url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — New York City skyline",
  },
  {
    path: "states/california.jpg",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
    note: "Unsplash — California Golden Gate",
  },
  // OG crops (same sources, 1200-ish width)
  {
    path: "og/default.jpg",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&h=630&q=80",
    note: "OG default",
  },
  {
    path: "og/interview.jpg",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&h=630&q=80",
    note: "OG interview cluster",
  },
  {
    path: "og/test-version.jpg",
    url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&h=630&q=80",
    note: "OG filing-date cluster",
  },
];

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "uscivics-quiz-image-curator/1.0 (educational site)",
      Accept: "image/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  const lines = [
    "# Image attribution",
    "",
    "All photos are used under Unsplash License (https://unsplash.com/license)",
    "unless noted. No endorsement by photographers or Unsplash.",
    "",
  ];
  for (const f of FILES) {
    const dest = join(out, f.path);
    if (existsSync(dest) && process.argv.includes("--skip-existing")) {
      console.log("skip", f.path);
      lines.push(`- \`${f.path}\` — ${f.note}`);
      continue;
    }
    process.stdout.write(`get ${f.path} ... `);
    try {
      const n = await download(f.url, dest);
      console.log(`${(n / 1024).toFixed(0)} KB`);
      lines.push(`- \`${f.path}\` — ${f.note}`);
    } catch (e) {
      console.log("FAIL", e.message);
      process.exitCode = 1;
    }
  }
  writeFileSync(join(out, "ATTRIBUTION.md"), lines.join("\n") + "\n", "utf8");
  console.log("Wrote ATTRIBUTION.md");
}

main();
