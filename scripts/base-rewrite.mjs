/**
 * base-rewrite.mjs — rewrite a built Astro `dist/` (authored for root `/`) so
 * every internal absolute URL is prefixed with a base path, for GitHub Project
 * Pages served at https://<user>.github.io/<repo>/.
 *
 * Usage: node base-rewrite.mjs <distDir> <base>   e.g. node base-rewrite.mjs ./out /time-imprints
 * Rewrites .html/.css/.js in place. Also writes .nojekyll (so /_astro/ survives Jekyll).
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const [, , DIST, BASE_RAW] = process.argv;
if (!DIST || !BASE_RAW) { console.error("usage: base-rewrite.mjs <dist> <base>"); process.exit(1); }
const BASE = "/" + BASE_RAW.replace(/^\/+|\/+$/g, ""); // "/time-imprints"

// Known internal roots that appear as absolute paths in our output.
const ALWAYS = ["_astro/", "img/", "theme.css", "favicon.svg"];   // static assets/dirs
const ROUTES = ["kits", "checkout", "gallery", "about", "paintings"]; // page routes (segment)
const alt = (arr) => arr.map((s) => s.replace(/[.]/g, "\\.")).join("|");

// after a quote/paren/left-delimiter: "/img/…", '/kits/…', (/img/…), "/checkout/"
const reQuote = new RegExp(
  `(["'(])\\/((?:${alt(ALWAYS)})|(?:${ROUTES.join("|")})(?=[\\/"'?#]|\\\\|$))`,
  "g"
);
// inside HTML-encoded JSON attributes: &#34;/kits/… , &quot;/img/… (Astro uses &#34;)
const reEnc = new RegExp(
  `(&quot;|&#34;)\\/((?:${alt(ALWAYS)})|(?:${ROUTES.join("|")})(?=[\\/?#]|&quot;|&#34;))`,
  "g"
);
// bare root links: href="/"  action="/"
const reBare = /(\b(?:href|action)=")\/(")/g;

function rewrite(s) {
  return s
    .replace(reBare, `$1${BASE}/$2`)
    .replace(reQuote, `$1${BASE}/$2`)
    .replace(reEnc, `$1${BASE}/$2`);
}

const exts = new Set([".html", ".css", ".js"]);
let files = 0, changed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.has(extname(p))) {
      files++;
      const before = readFileSync(p, "utf8");
      const after = rewrite(before);
      if (after !== before) { writeFileSync(p, after); changed++; }
    }
  }
}
walk(DIST);
writeFileSync(join(DIST, ".nojekyll"), "");
console.log(`base=${BASE} · scanned ${files} files · rewrote ${changed} · wrote .nojekyll`);
