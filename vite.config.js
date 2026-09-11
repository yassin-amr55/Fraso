import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { progress } from './src/data/progress.js';

/**
 * index.html's meta tags (og:description, twitter:description) can't
 * import React state — crawlers like WhatsApp's read the raw HTML, they
 * don't execute JS. So this reads the same src/data/progress.js the site
 * itself renders from and stamps its value into the `__OVERALL_PERCENT__`
 * placeholder in index.html, both in dev and in the production build.
 * Keeps the "one source of truth" promise: change overall in progress.js
 * and the share-link preview text updates with it, automatically.
 */
function injectProgressMeta() {
  return {
    name: 'inject-progress-meta',
    transformIndexHtml(html) {
      return html.replaceAll('__OVERALL_PERCENT__', String(progress.overall));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectProgressMeta()],
});
