#!/usr/bin/env node
/**
 * Sync the plugin development guide into this panel, and vendor marked.
 *
 * docs/ is the single source of truth — com.pi.devdocs/ui/docs/ is build
 * output, regenerated here.
 *
 * Run after editing docs/plugin-dev-guide.md, then bump the manifest version
 * and publish (see PLUGIN.md).
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** docs → ui/docs. Add a line here when a doc is added to the catalogue. */
const DOCS = [['docs/plugin-dev-guide.md', 'ui/docs/plugin-dev-guide.md']];

mkdirSync(join(ROOT, 'ui/docs'), { recursive: true });
for (const [src, dest] of DOCS) {
  copyFileSync(join(ROOT, src), join(ROOT, dest));
  console.log(`synced ${src} → ${dest}`);
}

// marked → ui/lib. `npm install` at the repo root supplies it; the panel loads
// the UMD build with a plain <script src>.
const umd = join(ROOT, 'node_modules/marked/lib/marked.umd.js');
if (!existsSync(umd)) {
  console.error(`marked not found at ${umd} — run \`npm install\` first`);
  process.exit(1);
}
mkdirSync(join(ROOT, 'ui/lib'), { recursive: true });
copyFileSync(umd, join(ROOT, 'ui/lib/marked.umd.js'));
console.log('vendored marked → ui/lib/marked.umd.js');
