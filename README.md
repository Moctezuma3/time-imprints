# Time Imprints — e-commerce site

Static [Astro](https://astro.build) site for **Time Imprints**, a brand of DIY
paint-imprint kits (hand / body prints on canvas, hug / kiss prints on t-shirts)
and one-of-a-kind finished paintings.

Pages: home, about, kits catalogue (+ 5 product pages), gallery, ready-made
paintings, and a client-side cart + checkout. Instagram & TikTok are featured
throughout as social proof.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ (built for root "/")
```

## Deploy to GitHub Pages (project site, served at /time-imprints/)

The source is authored for root `/`. Because GitHub **project** Pages serve at
`https://<user>.github.io/<repo>/`, the built output is rewritten to prefix every
internal URL with the base path, then published to the `gh-pages` branch.

```bash
npm run build
node scripts/base-rewrite.mjs dist time-imprints   # prefixes paths + writes .nojekyll
# publish the rewritten dist/ to the gh-pages branch (root)
```

`scripts/base-rewrite.mjs` prefixes `href`/`src`, inline `url(...)`, JS path
literals and the quiz's JSON data, and adds `.nojekyll` so the `_astro/` folder
survives GitHub's Jekyll step.

## Structure

- `src/data/site.ts` — single source of truth (products, ready-made pieces, nav, socials).
- `src/components/sections/` — page sections adapted from the component library.
- `src/components/Cart.astro` — the cart engine (`window.TICart`, localStorage) + drawer.
- `src/components/ReadymadeGallery.astro` — orderable one-of-a-kind paintings + inquiry modal.
- `src/pages/` — routes (`checkout.astro`, `kits/[slug].astro`, …).
- `public/theme.css` — brand tokens (pink `#e82f95` + cyan `#3fc3e8` on near-black).
