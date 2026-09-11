# Fraso — Official Progress Website

The public "road to release" site for **Fraso**, a dark fantasy story by Yassin Shehab
(Elent Tales). Built with React + Vite.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` folder you can
host anywhere (Netlify, Vercel, GitHub Pages, any static host).

## Updating the numbers on the site

You should never need to touch a component to change a statistic. Everything the site
displays is read from two files:

- **[src/data/progress.js](src/data/progress.js)** — overall completion %, the production
  category percentages (Idea, Story Lines, Text Writing, Text Polish, Scene Drawing, Scene
  Polish, Book Cover), pages completed, chapter progress, and the release-countdown switch.
- **[src/data/wordStats.js](src/data/wordStats.js)** — word/name mention counts. The
  leaderboard sorts itself by count automatically, so entries can be listed in any order and
  you can add or remove words freely.
- **[src/data/seo.js](src/data/seo.js)** — page title, meta description, canonical URL, cover
  image alt text, and the FAQ questions/answers. See "SEO" below for how this feeds both the
  visible page and search-engine metadata from one place.

Edit a value in either file and every place it's displayed on the site updates — nothing is
duplicated or hardcoded elsewhere.

### Adding a real release date later

Fraso doesn't have an announced release date yet, so the site currently frames progress as
"X% complete / Y% remaining" (both read live from `progress.js`) rather than a countdown
clock. When there's a real date:

1. Open `src/data/progress.js`.
2. Set `releaseDate` to an ISO date string, e.g. `"2027-06-01"`.
3. Set `countdownEnabled: true`.

The data layer is already shaped for this — wiring an actual countdown-timer component up to
those two fields is a self-contained follow-up, no redesign required.

## Project structure

```
public/          robots.txt, sitemap.xml, site.webmanifest, favicon/icons, and the cover
                 art itself (fraso-story-cover.jpg/.webp) — served at stable, descriptive
                 URLs rather than hashed build filenames, so social-preview links and
                 search-engine references to them never break across a rebuild.
src/
  assets/        Elent Tales logo (as used inside React components)
  data/          progress.js, wordStats.js, seo.js — the single source of truth for every
                 number and every search-facing string on the site
  hooks/         useCountUp, useInView, useReducedMotion — small animation utilities
  components/
    ui/          Reveal, ProgressBar, RadialGauge — shared building blocks
    Hero.jsx, ProgressSection.jsx, MilestoneSection.jsx,
    ChapterTimeline.jsx, WordStats.jsx, FAQSection.jsx, Footer.jsx
  styles/
    global.css   Design tokens (colors, type, spacing) + shared utilities
```

Each section component pairs with its own CSS file (e.g. `Hero.jsx` / `Hero.css`) so styling
stays scoped and easy to find.

## SEO

The site's `<head>` (title, meta description, canonical URL, Open Graph/Twitter tags, and
JSON-LD structured data) is generated at build time by a small Vite plugin
(`vite.config.js`) from `src/data/seo.js` and `src/data/progress.js` — the exact same data
the page itself renders from. That's deliberate: a stat like "48.5% complete" can't show one
number on the page and a stale one in a shared link's preview text, because both come from
`progress.overall`.

**To change:**
- Page title / meta description / canonical domain / cover image alt text → edit the `seo`
  object in `src/data/seo.js`.
- FAQ questions and answers → edit the `faq` array in the same file. It feeds both the
  visible "About Fraso" section on the page and the FAQPage structured data in `<head>` —
  schema.org requires those two to match, so one array is what keeps that guaranteed.
- If the site ever moves to a different domain, change only `canonicalUrl` at the top of
  `src/data/seo.js` — every URL derived from it (canonical tag, OG/Twitter image, JSON-LD,
  sitemap) updates with it.

### After deploying

1. Deploy the site (the current production URL is `https://fraso-elent.vercel.app/`, set as
   `canonicalUrl` in `src/data/seo.js` — update that value first if the real domain differs
   or changes later).
2. In [Google Search Console](https://search.google.com/search-console), add the domain as a
   property. The simplest verification method for a Vite/Vercel site is usually **HTML tag**:
   Search Console gives you a `content="..."` value — paste it into
   `googleSiteVerification` in `src/data/seo.js` (it's empty by default; nothing is
   pre-filled or invented) and redeploy. A `<meta name="google-site-verification">` tag will
   then appear in `<head>` automatically.
3. Submit `https://<your-domain>/sitemap.xml` in Search Console's Sitemaps section.
4. Use "Inspect URL" on the homepage and click **Request Indexing**.
5. Google discovers and (separately) indexes images from a crawled/rendered page on its own
   schedule — there's no direct "request indexing for this image" action. What actually
   helps the cover's odds of appearing in Google Images is already in place: it's a real
   `<img>` (not a CSS background), served at a stable, descriptive URL
   (`fraso-story-cover.jpg`), with meaningful alt text, listed in the sitemap's `<image:image>`
   extension, and described in the page's structured data. From here it's genuinely up to
   Google's own crawling and ranking — no legitimate technique guarantees inclusion or
   placement, and anything that claims to is worth being skeptical of.
6. Check back in Search Console's "Pages" and "Performance" reports over the following days
   and weeks to see indexing status and any search queries the site starts appearing for.

### What this can't control

Search Console readiness, structured data, and image markup improve the odds of good
indexing — they don't guarantee ranking position, inclusion in Google Images, or how fast
Google crawls the site. Those are Google's own decisions, made by systems outside this
codebase (crawl budget, perceived authority, competing results for the same query, and so
on). Nothing described above is a workaround for that; it's just making sure nothing on the
technical side is holding the site back from a fair shot.
