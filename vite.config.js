import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { progress } from './src/data/progress.js';
import {
  seo,
  canonicalUrl,
  googleSiteVerification,
  buildJsonLd,
  buildFaqJsonLd,
  lastModifiedIso,
} from './src/data/seo.js';

/**
 * index.html's <head> (title, meta description, canonical, OG/Twitter
 * tags, JSON-LD) can't import React state — crawlers like WhatsApp's or
 * Googlebot's first pass read the raw HTML, they don't run JS to reach a
 * React component. So this plugin reads the same src/data/seo.js and
 * src/data/progress.js the page itself renders from, and stamps their
 * values into placeholders in index.html at both dev and build time.
 * Keeps the "one source of truth" promise for SEO the same way it already
 * holds for the visible progress numbers: change progress.js or seo.js
 * and the <head> — title, description, structured data, share-preview
 * text — updates with it, automatically, with nothing to keep in sync by
 * hand.
 */
function injectSeoMeta() {
  return {
    name: 'inject-seo-meta',
    transformIndexHtml(html) {
      const replacements = {
        __SITE_TITLE__: seo.title,
        __SITE_DESCRIPTION__: seo.description,
        __CANONICAL_URL__: canonicalUrl,
        __COVER_IMAGE_URL__: seo.coverImage.url,
        __COVER_IMAGE_WIDTH__: String(seo.coverImage.width),
        __COVER_IMAGE_HEIGHT__: String(seo.coverImage.height),
        __COVER_IMAGE_ALT__: seo.coverImage.alt,
        __OVERALL_PERCENT__: String(progress.overall),
        __JSON_LD__: JSON.stringify(buildJsonLd()),
        __FAQ_JSON_LD__: JSON.stringify(buildFaqJsonLd()),
      };

      let output = html;
      for (const [placeholder, value] of Object.entries(replacements)) {
        output = output.replaceAll(placeholder, value);
      }

      // Only emit the verification meta tag once a real token exists —
      // an empty `content=""` would be an invalid/confusing tag to ship.
      output = googleSiteVerification
        ? output.replace(
            '<!-- __GOOGLE_SITE_VERIFICATION__ -->',
            `<meta name="google-site-verification" content="${googleSiteVerification}" />`
          )
        : output;

      return output;
    },
  };
}

/**
 * Overwrites dist/sitemap.xml (a copy of public/sitemap.xml is already
 * there from Vite's normal public-dir handling) with one whose <lastmod>
 * is actually derived from progress.js's lastUpdated, instead of whatever
 * date happened to be hand-typed into the checked-in file. Only runs for
 * `vite build` — the checked-in public/sitemap.xml is what `vite dev`
 * serves locally, which doesn't need to be exact.
 */
function emitSitemap() {
  return {
    name: 'emit-sitemap',
    apply: 'build',
    closeBundle() {
      const lastmod = lastModifiedIso ?? new Date().toISOString().slice(0, 10);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${seo.coverImage.url}</image:loc>
      <image:title>Fraso — Story Cover</image:title>
      <image:caption>${seo.coverImage.alt}</image:caption>
    </image:image>
  </url>
</urlset>
`;
      writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectSeoMeta(), emitSitemap()],
});
