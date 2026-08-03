import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import {
  hrefFor,
  linksForLearnSlug,
  linksForPath,
  type LinkCluster,
  type StudyLink,
} from "@/lib/internal-links";

function resolveLabel(link: StudyLink, dict: Dictionary): string {
  if (link.labelKey === "custom") return link.customLabel ?? link.path;
  return dict[link.labelKey as keyof Dictionary] ?? link.customLabel ?? link.path;
}

function LinkGroup({
  title,
  links,
  locale,
  dict,
}: {
  title: string;
  links: StudyLink[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (!links.length) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {links.map((l) => (
          <li key={l.path}>
            <Link
              href={hrefFor(locale, l.path)}
              className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
            >
              {resolveLabel(l, dict)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedGrid({
  cluster,
  locale,
  dict,
}: {
  cluster: LinkCluster;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <nav
      aria-label={dict.relatedStudyHeading}
      className="mt-8 rounded-2xl border border-line bg-mist/40 p-5 sm:p-6"
    >
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
        {dict.relatedStudyHeading}
      </h2>
      <p className="mt-1 text-sm text-muted">{dict.relatedStudyLead}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <LinkGroup
          title={dict.relatedLearn}
          links={cluster.learn}
          locale={locale}
          dict={dict}
        />
        <LinkGroup
          title={dict.relatedQuestions}
          links={cluster.questions}
          locale={locale}
          dict={dict}
        />
        <LinkGroup
          title={dict.relatedPractice}
          links={cluster.practice}
          locale={locale}
          dict={dict}
        />
      </div>
    </nav>
  );
}

export function RelatedStudyLinksForLearn({
  slug,
  locale,
  dict,
}: {
  slug: string;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <RelatedGrid
      cluster={linksForLearnSlug(slug)}
      locale={locale}
      dict={dict}
    />
  );
}

export function RelatedStudyLinksForPath({
  path,
  locale,
  dict,
}: {
  path: string;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <RelatedGrid cluster={linksForPath(path)} locale={locale} dict={dict} />
  );
}
