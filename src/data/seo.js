/**
 * ─────────────────────────────────────────────────────────────────────────
 *  FRASO — SEO / GEO / AEO CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────
 *  Every search-facing string on the site (page title, meta description,
 *  canonical URL, social-preview image, structured data, and the FAQ
 *  section's questions) is centralized here or derived from here plus
 *  src/data/progress.js. Nothing below is duplicated by hand elsewhere —
 *  index.html's static <head> tags are filled in from this file at
 *  build/dev time by the Vite plugin in vite.config.js, and the visible
 *  <FAQSection> component renders `faq` directly.
 *
 *  If you move the site to a different domain, change ONLY
 *  `canonicalUrl` below — every URL derived from it (canonical, OG image,
 *  JSON-LD, sitemap references) updates with it. The values currently set
 *  point at the real Vercel deployment the site owner gave: it is not a
 *  guess or placeholder.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { progress, remainingPercent } from './progress.js';

// ── Canonical domain ────────────────────────────────────────────────────
// Change this one value if the site ever moves to a different domain.
export const canonicalUrl = 'https://fraso-elent.vercel.app/';

export const seo = {
  siteName: 'Fraso',
  // Kept close to the site's existing on-brand voice, with "Elent Tales"
  // folded in so the title tag itself carries the entity signal people
  // search for ("Fraso Elent Tales") — this string is invisible on the
  // page itself (browser tab / search result only), so it doesn't change
  // anything about the design.
  title: 'Fraso — The Story Is Being Written | Elent Tales',
  description:
    "Fraso is an original dark fantasy story by Yassin Shehab, published under Elent Tales. Follow its progress live, from first ideas to finished pages and chapters.",
  author: 'Yassin Shehab',
  authorUrl: 'https://www.yassinamr.com/',
  organization: 'Elent Tales',
  locale: 'en',
  coverImage: {
    url: `${canonicalUrl}fraso-story-cover.jpg`,
    webpUrl: `${canonicalUrl}fraso-story-cover.webp`,
    width: 1414,
    height: 2000,
    // Bump this whenever the cover artwork changes. It's appended to the
    // og:image / twitter:image URLs only (not JSON-LD or the sitemap), so
    // WhatsApp/Facebook/X see a brand-new image URL and don't keep serving
    // a cached copy of the previous cover in link previews.
    version: '2',
    // Human-first alt text: what the image actually is, for anyone using
    // a screen reader, plus the same context a search engine needs.
    alt: 'Fraso story cover art by Yassin Shehab, published under Elent Tales',
  },
  logoImage: {
    url: `${canonicalUrl}elent-tales-logo.png`,
    width: 640,
    height: 640,
  },
};

/**
 * Google Search Console site-verification token.
 *
 * Left empty on purpose — no token is invented here. After deploying,
 * verify the property in Search Console (either the "HTML tag" method,
 * which gives you a value to paste into VERIFICATION below, or the DNS
 * method, which needs no code change at all). See README.md for the full
 * post-deploy checklist.
 */
export const googleSiteVerification = '';

// ── FAQ ──────────────────────────────────────────────────────────────────
// Single source for both the visible <FAQSection> on the page and the
// FAQPage structured data in <head> — schema.org requires the two to
// match, so generating both from one array is what keeps that true.
// Every answer here states only facts that are also visible elsewhere on
// the page (progress.js's live numbers, or the cover/footer credits).
export const faq = [
  {
    question: 'What is Fraso?',
    answer:
      "Fraso is an original dark fantasy story — \"Rising From Ashes\" — created by Yassin Shehab and published under Elent Tales.",
  },
  {
    question: 'Who created Fraso?',
    answer: 'Fraso is written and illustrated by Yassin Shehab, under the Elent Tales banner.',
  },
  {
    question: 'What is Elent Tales?',
    answer: 'Elent Tales is the studio publishing Fraso — the name and mark behind the project.',
  },
  {
    question: 'How complete is Fraso right now?',
    answer: `Fraso is currently ${progress.overall}% complete overall, with ${remainingPercent}% of the story still being written, drawn, and polished.`,
  },
  {
    question: 'How many pages of Fraso are finished?',
    answer: `${progress.pagesCompleted} pages are completely finished so far.`,
  },
  {
    question: 'What chapters of Fraso are complete?',
    answer: describeChapterProgress(progress.chapters),
  },
  {
    question: 'Where can I follow the progress of Fraso?',
    answer: "Right here — this website tracks Fraso's development openly and is updated as the story moves forward.",
  },
];

function describeChapterProgress(chapters) {
  const parts = chapters.map((chapter) => {
    if (chapter.status === 'locked') return `${chapter.label} has not started yet`;
    if (chapter.value === 0) return `${chapter.label} is underway with no pages finished yet`;
    return `${chapter.label} is ${chapter.value}% complete`;
  });
  return parts.join('. ') + '.';
}

/**
 * Best-effort parse of progress.lastUpdated ("September 11, 2026") into an
 * ISO date, for structured data's dateModified. Falls back to nothing
 * (property omitted) rather than guessing if the string doesn't parse —
 * matches the site's rule of never fabricating a fact.
 */
function toIsoDate(humanDate) {
  if (!humanDate) return null;
  const parsed = new Date(humanDate);
  if (Number.isNaN(parsed.getTime())) return null;
  // Use the parsed date's own local Y/M/D, not .toISOString() — that
  // converts to UTC first, which silently shifts the calendar day
  // backward by one for any timezone ahead of UTC (the exact bug this
  // comment used to not warn about).
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * progress.lastUpdated as an ISO date, reused for both JSON-LD's
 * dateModified and sitemap.xml's <lastmod> — one derivation, two
 * consumers, so they can't disagree with each other.
 */
export const lastModifiedIso = toIsoDate(progress.lastUpdated);

/**
 * Builds the full JSON-LD entity graph for the page: the Fraso creative
 * work, its cover image, Yassin Shehab, Elent Tales, the website, and the
 * page itself — connected by @id so the graph reads as one consistent set
 * of facts rather than disconnected snippets. Every fact here is derived
 * from progress.js/seo.js, the same data the visible page renders from,
 * so it cannot drift out of sync the way a hand-typed <meta> tag can.
 */
export function buildJsonLd() {
  const personId = `${canonicalUrl}#author`;
  const orgId = `${canonicalUrl}#publisher`;
  const workId = `${canonicalUrl}#fraso`;
  const imageId = `${canonicalUrl}#cover`;
  const websiteId = `${canonicalUrl}#website`;
  const pageId = `${canonicalUrl}#webpage`;
  const dateModified = toIsoDate(progress.lastUpdated);

  const chapterSummary = describeChapterProgress(progress.chapters);

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: seo.author,
      url: seo.authorUrl,
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: seo.organization,
      url: canonicalUrl,
      logo: {
        '@type': 'ImageObject',
        url: seo.logoImage.url,
        width: seo.logoImage.width,
        height: seo.logoImage.height,
      },
    },
    {
      '@type': 'ImageObject',
      '@id': imageId,
      contentUrl: seo.coverImage.url,
      url: seo.coverImage.url,
      width: seo.coverImage.width,
      height: seo.coverImage.height,
      caption: seo.coverImage.alt,
      description: seo.coverImage.alt,
      creator: { '@id': personId },
      copyrightHolder: { '@id': orgId },
      representativeOfPage: true,
    },
    {
      // Fraso is presented on its own cover as a page-based, illustrated
      // story (chapters, pages, a book cover) — Book is the accurate
      // schema.org type here, not a generic CreativeWork.
      '@type': 'Book',
      '@id': workId,
      name: 'Fraso',
      alternateName: 'Fraso — Rising From Ashes',
      author: { '@id': personId },
      creator: { '@id': personId },
      publisher: { '@id': orgId },
      image: { '@id': imageId },
      inLanguage: seo.locale,
      description: `Fraso is an original dark fantasy story by ${seo.author}, published under ${seo.organization}. It is currently ${progress.overall}% complete, with ${progress.pagesCompleted} pages finished. ${chapterSummary}`,
      url: canonicalUrl,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: seo.siteName,
      url: canonicalUrl,
      publisher: { '@id': orgId },
      about: { '@id': workId },
      inLanguage: seo.locale,
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': workId },
      primaryImageOfPage: { '@id': imageId },
      inLanguage: seo.locale,
      ...(dateModified ? { dateModified } : {}),
    },
  ];

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** FAQPage structured data — mirrors the visible <FAQSection> exactly. */
export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
