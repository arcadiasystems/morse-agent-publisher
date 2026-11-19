# Morse Agent Publisher

The site for **Morse Agent Publisher**, at
[agentpublisher.morsecms.xyz](https://agentpublisher.morsecms.xyz): agents
publish, you keep the key. It presents one recipe from the Morse docs,
[Let an AI agent publish](https://docs.morsecms.xyz/agent-publishes.html): give
an AI agent a wallet of its own and a PublisherCap for one publication, let it
publish with the Morse CLI or SDK, and revoke the cap with one command.

It is a recipe, not a product. Nothing on the page is a hosted app, a package
or an installer, and the page says so. Every "Read the recipe" button opens the
docs page.

One of five sibling sites that share one dark base:
[Morse Receipts](https://receipts.morsecms.xyz) (paper),
[Morse Agents](https://agents.morsecms.xyz) (lime),
[Morse Press](https://press.morsecms.xyz) (vermilion), Morse Agent Publisher
(process magenta) and [Morse Site Importer](https://siteimporter.morsecms.xyz)
(marker yellow).

## Routes

| Route | What it is |
|---|---|
| `/` | The site: ten sections, prerendered and then hydrated |
| anything else | `404.html`, served with a 404 status. Static, no script, `noindex` |

## Example content

Nothing on the page is data. The names it uses are generic, and the hero
object that shows them is labelled "Example": the publication `my-blog`,
the post `hello-world` in `posts/hello-world.md`, and the placeholders
`0xAGENT_WALLET_ADDRESS`, `0xAGENT_CAP_ID`, `0xYOUR_PUBLICATION_ID` and
`suiprivkey1...`. There is no digest, wallet, date, count or cost on the page;
do not add one.

## The copied text

The three tabs of "The handover" hold the recipe's own text: the rules file for
`CLAUDE.md`, the agent's shell variables and the example prompt. It lives in
`src/data/handover.tsx`, wrapped to 57 characters with no word changed, and
Copy puts the visible file on the clipboard from that same data, without the
note numbers and without the caption of the third tab. If the docs page
changes, change this file to match it. Two differences from the docs are
deliberate: the shell block carries `0xYOUR_PUBLICATION_ID` where the docs
show a shortened real id, and its comment is a line of its own.

Copy uses the Clipboard API, falls back to the older copy command where that
API is missing or refused, and if both fail selects the text and reads "Select
and copy". The confirmation is the button's label and a `role="status"` line
for screen readers.

## Develop

```sh
npm install
npm run dev      # vite dev server, the page prerendered on request
npm run build    # tsc + production build, prerendered to static HTML in dist/
npm run lint     # eslint
npm run og       # redraw public/og.png, the share image, from og/ (needs Playwright's Chromium)
npm run icons    # redraw the icon files in public/ from favicon.svg and og/icon-full.svg
```

Stack: Vite + React 19 + TypeScript (strict), plain CSS, no runtime dependency
beyond React. Same toolchain as `arcadiasystems/morse-landing`.

## Structure

| Path | What lives there |
|---|---|
| `src/styles/base.css` | The shared dark base. Identical in the five sites |
| `src/styles/tokens.css` | This site's `:root` tokens: the Process Magenta palette |
| `src/styles/agent-publisher.css` | This site's own objects: the cap on its leash, the ghost form, the file viewer, the lanes, the transaction tiles, the two keys, the recipe card |
| `src/base/` | The React pieces the base implies (nav, status label, footer, final band, band, FAQ, tabs). Identical in the five sites |
| `src/components/` | One component per section of the page, and the marks |
| `src/data/handover.tsx` | The recipe's three files, as drawn and as copied |
| `src/lib/clipboard.ts` | Copying, with its fallback |
| `src/lib/links.ts` | Every URL the site links to |
| `vite.config.ts` | The build, and the plugin that prerenders each page |
| `og/` | The share image as a page (`og.html`, `Card.tsx`, `card.css`: identical in the five sites; `main.tsx` and `object.css`: this site's content and hero object) and `icon-full.svg`, the full-bleed icon source. Not a build input |
| `scripts/` | `og.mjs` and `icons.mjs` draw `public/og.png` and the icon files with Playwright; `png.mjs` re-compresses what they write. Run by hand, never by the build or CI. Identical in the five sites |
| `design/` | The approved design and its handover. Not a build input, not linted, not deployed |

`src/styles/base.css` and `src/base/` are written in
`arcadiasystems/morse-receipts` and copied here verbatim. Do not edit them
here: change them in morse-receipts and copy them again, so the sites never
drift.

## Design handover

The design is `design/agent-publisher.html`, a single file with its CSS and
script inline, with renders at 1440 and 390 beside it and
`design/HANDOVER.md`, this site's part of the design handover. Class names in
the code are the ones the handover uses, so it stays a usable map: `.leash`,
`.leash__in`, `.owner`, `.cord`, `.hang`, `.capc`, `.life`, `.nogate`,
`.ghost`, `.three`, `.kit`, `.ftab`, `.notes`, `.copy`, `.lanes`, `.step`,
`.idle`, `.keydot`, `.txs`, `.tx`, `.keeps`, `.keys`, `.key`, `.else`, `.dd`,
`.rcardbox`, `.rcard`, `.limits`, `.bands`.

Things to keep when changing the page:

- The hero runs on one 12-second clock: the three rows light from 8, 30 and 62
  percent, the dash writes from 26 to 34 percent, and the revoked state holds
  from 62 to 94 percent on the pass, its two pills and the cord. Keep the
  percentages together.
- The cord ends at the top centre of the pass, which is the origin of the
  swing and of the 3D turn, so the joint never opens. The hero object is a
  fixed 520 by 580 box, scaled as a whole at 1180 and 980; do not resize its
  children. At 860px and below it is flat and the cord is hidden.
- The pass is CSS 3D with a backdrop blur. Chromium's single full-page
  screenshot does not paint it; stitch viewport screenshots instead.
- Text on magenta is dark (`--on-acc`), never bone. Magenta marks what the
  agent holds or does, bone what stays with you. Green is only for the cap's
  Active state and the lamp, amber only for Example labels.
- Inline SVG cannot read CSS variables, so the hexes in the marks are literal.
- Every animation stops under `prefers-reduced-motion`, and the object rests
  complete, in its Active state.
- The commands were checked against `@arcadiasystems/morse-cli@0.14.0`. When
  the CLI or SDK version moves, check them again and update the "Uses" chips
  and the line under the lanes.

`public/favicon.svg` holds two drawings of the mark: the round one, and one
laid on a 16px grid that shows up to 20px, where the round dot and dash would
thin to a line.

## Hosting

Deployed by Vercel from this repository: production from `main`, a preview
for every pull request, custom domain `agentpublisher.morsecms.xyz`.
`vercel.json` holds everything the deployment needs:

- Framework preset `vite`, install `npm ci`, build `npm run build`, output `dist`.
- Clean URLs with no trailing slash.
- Unknown paths get `404.html` with a 404 status.
- Files under `/assets/` are fingerprinted by the build and cached for a year.
  The share image, the icons and the manifest are cached for a day. Everything
  else, HTML included, is revalidated on every request.

## Measurement

No analytics or tracking script is loaded; choosing a tool is the owner's
call. The elements to measure carry stable attributes.

`data-cta`, actions on this site:

| Value | Element |
|---|---|
| `primary` | Hero, "Read the recipe". With `nav` and `final`, the site's primary event: opens of the recipe |
| `secondary` | Hero, "Copy the CLAUDE.md snippet" |
| `nav` | Nav, "Read the recipe" |
| `final`, `final-secondary` | The final band's two buttons |

`data-copy` marks the Copy button, the best signal on the page: the moment a
visitor takes the recipe with them. `data-tabs` marks the file viewer whose
tabs change.

`data-link`, links to the sibling sites:

| Value | Where |
|---|---|
| `morse` | Nav "Morse ↗", footer |
| `agents` | The Morse Agents band, footer |
| `press` | The Morse Press band, footer |
| `receipts` | Footer |
| `site-importer` | Footer |

## Licence

MIT. See [LICENSE](LICENSE).
