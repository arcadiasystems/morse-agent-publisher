# Morse Agent Publisher: design handover

Date: 19 Nov 2026. This is the Morse Agent Publisher part of `HANDOVER-v5.md`, the design handover for the two recipe sites (Agent Publisher and Site Importer), kept here with the design it describes: `agent-publisher.html` and the renders `agent-publisher-desktop.png` (1440) and `agent-publisher-mobile.png` (390) in this folder. The sections on Morse Site Importer are left out; they live in `arcadiasystems/morse-site-importer`. Everything else is the handover's own text. It was written to be read after `HANDOVER.md` and `HANDOVER-landing.md` of the `morse-sites-v4` design package, which hold the identity, the Morse devices, the copy rules and the audit method.

| Site | File | Domain | Talks to | Headline | Primary action |
|---|---|---|---|---|---|
| Morse Agent Publisher | `agent-publisher.html` | agentpublisher.morsecms.xyz | Developers who run an AI agent and want it to publish | Agents publish. You keep the key. | Read the recipe |

How the two recipe sites differ from the other three, in one line. Receipts, Agents and Press are products. These two are recipes: a documented way to do a job with the Morse CLI and SDK that exist today. Neither page presents a hosted app, a package or an installer, because there is none. Each page says so in the hero, in a section of its own ("A recipe. Not a service.") and in its first question.

Why "Read the recipe". The only thing a visitor can do today is open the docs page and follow it, so the button names that and points at it: `https://docs.morsecms.xyz/agent-publishes.html`. It resolves (checked 19 Nov). "Get started", "Install" and "Launch" were rejected because each implies something to install or open. The secondary action keeps the visitor on the page at the part they came for: "Copy the CLAUDE.md snippet" (the landing card promises that snippet).

Links in the file are absolute, because the sibling sites are live and there are no local copies to point at.

## Shared build notes

- Both files inline `src/styles/base.css` from `main` of arcadiasystems/morse-receipts, byte for byte, under the comment "shared base". Nothing in it was edited. Above it sits one `:root` line with the token contract (`--bg`, `--bg-rgb`, `--panel-rgb`, `--dim`, `--mute`, `--acc`, `--acc-rgb`, `--lift`, `--lift-rgb`, `--tint-rgb`, `--em`, `--on-acc`, `--ok`, `--warn`); below it sits the site block. In a repo these are `tokens.css`, `base.css` and `<site>.css`, in that order, with `src/base/` copied verbatim.
- No change to the base is needed. Two things a builder might take for one: each site block sets `.hero__grid{width:100%}` (the hero is a flex container, so a short headline would otherwise let the grid shrink to its content), and each adds `:focus-visible` with a 2px lift outline, because the base has no focus rule. If the owner wants the focus rule in the base, it is one line; raise it in morse-receipts and copy again.
- Each site writes its own `.two`, `.why`, `.fine`, `.glow` opacity, `.pill.dash`, the 860px `.band` rules and `.faq summary{font-size:20px}`, as BASE-NOTES lists.
- Status label: cells `DOCS RECIPE`, then `CLI OR SDK` (Agent Publisher) or `BASH + JQ` (Site Importer), then `ABOUT 15 MINUTES`, which hides at 860px. The tape spells PUBLISHER and IMPORTER. The lamp cell does not say LIVE: a recipe is not a running thing. `StatusLabel` takes all of this through its two props.
- Nav: the stacked lockup with the product's own mark from `logos/` (Trace raised, accent below), five section links, "Morse ↗", and "Read the recipe ↗". In `src/base` pass the mark through the `Mark` prop as Press does. The product word in the lockup has a space ("agent publisher", "site importer"); `Lockup` lower-cases the `product` prop and renders it as given, so pass the two words.
- Inline SVG marks carry literal hexes, as in the family: `#FF3EA5` on Agent Publisher, `#FFE62E` on Site Importer. The logo files in `logos/` use the ultramarine lift `#7D8BFF`; on its own site each mark takes the site's colour, as the Press mark takes vermilion.
- Sibling names carry their own colours: Agents lime `#C6F135`, Press vermilion `#FF5A36`, Uploader ultramarine lift `#7D8BFF`, and Agent Publisher magenta `#FF3EA5` where Site Importer names it.
- Breakpoints follow the family: 1080 hides the nav links and collapses the wide objects, 860 is the one-column layout. The two heroes add two scale steps of their own, at 1180 and 980, so the 3D object never reaches the text.
- Every animation stops under `prefers-reduced-motion`. `interact.py` reports zero running animations on both pages with reduced motion emulated, and each object rests in its complete state.
- Tabs: one tab stop, arrow keys move and select, Home and End jump, every panel stays in the markup. The inline script does exactly what `useTabs` does; in the build use `useTabs`.
- No text under 11px. No em dashes. "Plug and play", "one click", "immutable" and "cannot be taken down" are not used. The network is written "Walrus Mainnet" everywhere in page copy.
- One device is shared by the two recipe sites and only by them: the recipe card (`.rcard`), an index card with a coloured rule under its title and the recipe's own facts on ruled lines.

## Morse Agent Publisher (`agent-publisher.html`)

The idea the page is built on: write access in Morse is an object. You issue it to an agent's own wallet, the agent publishes with it, and you take it back. Everything on the page is drawn from the owner's side of that sentence.

Palette, Process Magenta:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A070A` | The field: a black with a trace of plum, where Press is warm and Agents is green |
| `--text` | `#F4F2EC` | Bone, unchanged (17.9:1 on the field) |
| `--dim`, `--mute` | `#C4BAC2`, `#9B8F99` | Greys for body and captions (10.6:1 and 6.5:1 on the field; mute is 6.3:1 on a panel) |
| `--acc` | `#FF3EA5` | Magenta. The headline clause, the primary button, the dot and dash on the cap, the agent's key, the leash signal (6.2:1 on the field) |
| `--lift` | `#FF9BCF` | `//` labels, the Morse tape, numbers, command names (10.3:1) |
| `--acc-rgb`, `--lift-rgb`, `--tint-rgb` | `255,62,165` · `255,155,207` · `255,221,238` | Translucent accents |
| `--panel-rgb` | `17,12,17` | Solid panels |
| `--on-acc` | `#0A070A` | Text on magenta is dark, never bone (6.2:1 against 2.9:1) |
| `--ok`, `--warn` | `#6FD3A6`, `#F0C96A` | Green only for the cap's Active state and the lamp; amber only for Example labels |
| `--agents`, `--press` | `#C6F135`, `#FF5A36` | Only for the two sibling lockups in the bands |

Why magenta. The family holds blue, vermilion, lime and paper, and the handover has already closed cyan, amber, violet and teal green. What is left of the wheel is the arc between blue and vermilion, and its centre is magenta: 94 degrees of hue from Uploader's blue, 43 from Press, 106 from Agents. It is the right colour for this product for three reasons. First, magenta is the colour a machine prints with. Press took the hand press's second colour, a red mixed by a person; process magenta is the ink of a device that runs unattended, which is what this page is about. Second, it is the colour developers already read as "not written by a person": the missing-texture colour, the debug overlay, the highlight nobody would choose by hand. On this page it marks everything the agent holds or does, and bone marks everything that stays with you, so the two keys are told apart by colour before a word is read. Third, the two siblings this page links to are Agents and Press, and magenta is far from both, so their lockups in the bands stay unmistakable. It is a loud colour and is held to small things: one headline clause, one button, the dot and dash, the agent's key and thin marks. Brass (a key is brass, and yellow on black is a warning label) was the other candidate; it sits 29 degrees from Agents lime, which is linked on this very page, and yellow is needed for Site Importer. Orchid (the colour everyone gives AI) was rejected for that reason and because violet was already ruled too close to Uploader. `agent-publisher-v-brass.html`, `agent-publisher-v-orchid.html` and `agent-publisher-palettes.png` show the alternatives.

| # | Section (id) | Custom object |
|---|---|---|
| 1 | Hero (`#top`) | The cap on its leash (`.leash`, `.leash__in`, `.owner`, `.cord`, `.hang`, `.capc`, `.life`). A small solid tile, "Your machine, OwnerCap, issues · revokes". A squared cord in the shape of the Trace runs from it to a glass pass hanging in 3D by its lanyard slot: the PublisherCap, with three dotted-leader rows (bound to the agent's address, scope `my-blog`, issued by your OwnerCap), a state pill, and the mark's dot and dash in magenta along its foot. A dot and a dash, A in Morse, travel down the cord. Over the lower left a panel (`.life`) lists the three commands. On a 12-second loop the rows light in turn, the dash "writes", and at `cap revoke` the cord goes dashed, the signal stops, the pass turns grey and its pill reads Revoked. Marked "Example". |
| 2 | Why (`#why`) | The form that is not there (`.nogate`, `.ghost`, `.three`). Left, a dashed ghost of a signup form: three struck fields (click through signup, create an API key, paste it somewhere) and a struck Continue button, headed "What an agent cannot do". A magenta dot and dash point right to three lines in large type: a wallet, a cap, the docs. Then "Morse has no signup. So an agent can do the whole job from a shell." |
| 3 | The handover (`#kit`) | A file viewer with three working tabs (`.kit`, `.kit__bar`, `.kit__tabs`, `.ftab`, `.kit__pane`, `.notes`, `.copy`): `CLAUDE.md`, its shell, its job. Each pane is the recipe's own text with the lines that matter highlighted and numbered, and the same numbers explained beside it. Copy puts the visible block on the clipboard without the note numbers. |
| 4 | The commands (`#run`) | Two lanes (`.lanes`, `.lanes__hd`, `.step`, `.step.it`, `.idle`, `.keydot`): your machine on the left with a bone key, the agent's shell on the right with a magenta key, a dashed spine between them and five numbered steps in time order. The empty cells say who is waiting: "No cap yet · it cannot write", "You are not in the loop · the owner key stays home", "After step 05 · its next write aborts on chain". Below 860px it is one column and each step carries a "You" or "The agent" pill. |
| 5 | Audit and revoke (`#audit`) | Five transaction tiles in order (`.txs`, `.tx`, `.tx__by`, `.tx__dg`), each with the wallet that signed it, the command and what it returns. The agent's are tinted magenta, your `cap revoke` has a bone border, and the write after it is dashed and struck: "No record written". Then three plain statements (`.keeps`), including the one cost nobody mentions: `entry add` uploads to Walrus before it writes to Sui, so a write attempted after revocation still pays for the upload. |
| 6 | Scope (`#scope`) | Two keys drawn in CSS (`.keys`, `.key`, `.key__bow`, `.key__blade`, `.key__teeth`). The bone key, OwnerCap, stays: issue and revoke caps, transfer ownership, delete. The magenta key, PublisherCap, goes: create collections, add entries, append and publish revisions, decrypt team content. Each key has one tooth per permission. A dashed box (`.else`) covers everyone else. Beside them the recipe's do and do not list (`.dd`), each "do not" struck in magenta. |
| 7 | What this is (`#recipe`) | The recipe card (`.rcardbox`, `.rcard`), tilted two degrees, beside four numbered limits (`.limits`): you run it, Walrus Mainnet is real money, storage is a paid lease, encryption is Testnet-ready only. |
| 8 | Family, Questions, Final | Two glass bands (`.bands`): Morse Agents in lime and Morse Press in vermilion, with "Uses" chips. Six questions as `<details>`. "Issue a cap. Revoke it any time." with two glass tiles carrying the Agent Publisher mark. |

Build notes:

- The hero runs five linked animations on one 12-second clock: `s1`, `s2`, `s3` (the rows, lit from 8, 30 and 62 percent), `wrote` (the dash, 26 to 34 percent), and the revoked state from 62 to 94 percent (`dead` on the pass, `ston` and `stoff` on the two pills, `cut` and `gone` on the cord). Keep the percentages together if the timing changes. Two more run on their own: `key` (2.4 seconds, the signal on the cord) and `swing` (7 seconds, 3 degrees, on `.hang`).
- The cord is one inline SVG with two copies of the path `M188 64 H356 V120`; its end is the top centre of the pass, which is also the origin of both the swing and the 3D rotation, so the joint never opens. The cord is styled from CSS and so reads `--acc`; the marks do not.
- The hero object is a fixed 520 by 580 box anchored to the right of its column. It is scaled with `transform: scale()` at 1180 (0.88) and 980 (0.74) with the height of `.leash` set to match; do not resize its children. At 860 it loses the 3D: the tile, the pass, the panel and the label stack flat, and the cord is hidden.
- As on Press, a single full-page screenshot does not paint the pass, because it combines 3D with backdrop blur. Use `shots.py`.
- The pass's Revoked pill is `aria-hidden`: the animation is an illustration, and a screen reader hears the object's label and the Active state.
- The lanes use an explicit grid row per step (`.r1` to `.r5`, `.r23`, `.r45`); the idle cells are `aria-hidden` and hidden below 860.
- Lane code is 40 characters or fewer so it never wraps on a phone, where the spine is dropped to give the code the full width. The longest other line is 55.
- The audit is clean at 1440, 1024 and 390, with overflow 0 at nine widths from 1440 to 390. Expected reports: closed FAQ answers, inline code that wraps across two lines on a phone, and the nav brand's 31px tap height inside the 76px nav.

Status on this page. The recipe works today with CLI 0.14 and SDK 0.12, on Testnet and, for public content, on Walrus Mainnet. The page says it was written for Testnet and that Walrus Mainnet costs real SUI and WAL. It quotes the SDK's "usable but young". It states that encryption works out of the box on Testnet only. It does not say an agent "cannot" misbehave: a cap holder can create collections and decrypt team content, and the page lists both. The Morse Agents band says the template is not shipped yet.

Example content on this page, all generic and labelled: the publication `my-blog`, the post `hello-world` and `posts/hello-world.md`, and the placeholders `0xAGENT_WALLET_ADDRESS`, `0xAGENT_CAP_ID`, `0xYOUR_PUBLICATION_ID` and `suiprivkey1...` in the docs' own style. There is no digest, wallet, date, count or journal on the page. The prompt in the third tab is the recipe's own example and is labelled as that.

## Verified code

Checked on 19 Nov 2026 against `@arcadiasystems/morse-cli@0.14.0`, installed locally, using `morse <command> --help`. No transaction was sent for the design. (The build then ran the five steps once on Testnet; see the pull request that added the site.)

| On the page | Where | Checked against |
|---|---|---|
| `morse cap issue <holder>` | `#run`, `#audit` | `cap issue --help`: `<holder>`, optional `-P` |
| `morse cap list [address]` | `#run` | `cap list --help`: lists revoked caps too |
| `morse cap revoke <publisherCapId>` | `#run`, `#audit` | `cap revoke --help` |
| `morse --json -q --yes status` | `#run` | Root help: `--json`, `-q`, `-y, --yes`; `status --help` |
| `morse --json -q --yes entry add <name> --file --epochs` | `#run`, `#kit` | `entry add --help`: `-f, --file`, `--epochs` (default 3) |
| `morse entry list`, `morse entry read <entryId>` | `#run`, `#kit` | `entry list --help`, `entry read --help` |
| `morse revision publish-direct <entryId> --file --epochs` | `#kit`, `#audit` | `revision publish-direct --help` |
| `account export` (named only, as forbidden) | `#kit` | `account --help` |
| `--network mainnet`, `MORSE_NETWORK` | The FAQ | Root help |
| `MORSE_PRIVATE_KEY`, `MORSE_PUBLICATION`, `MORSE_COLLECTION` | `#kit` | The CLI README's variable table |

The CLAUDE.md snippet, the shell variables and the prompt are the text of `agent-publishes.html`, re-wrapped to 57 characters; no word was changed. One code span in the snippet now breaks across two lines, which Markdown allows.

No code line on the page is longer than 57 characters. The lane commands are 40 or fewer.

Facts from the package READMEs that the page respects: public content is supported on Testnet and Walrus Mainnet and encrypted commands need your own Seal key-server credentials on mainnet (CLI 0.14.0 README); mainnet is "usable but young" (SDK 0.12.0 README); Walrus storage is paid per epoch and expires unless renewed (both).

## Verify before publishing

The handover's list, with the items that concern only Site Importer left out and the original numbers kept.

1. Run each block once on Testnet with a funded wallet: the five lane commands. Confirm that `entry add --json` prints `entryId` and a digest, since two sentences say so ("JSON comes back for it to read, with the entry id and the transaction digest", "Returns · entry id, digest").
3. "Decrypt team content" comes from the docs (`co-author`); confirm it still holds on CLI 0.14.
4. "A write attempted after revocation still pays for the upload, then fails" comes from `co-author.html`. It is the least flattering sentence on the site and worth keeping only while it is true.
5. Every link: the recipe page, `cookbooks.html` and `sdk-workflows.html` returned 200 on 19 Nov. `agentpublisher.morsecms.xyz` and `siteimporter.morsecms.xyz` do not exist yet and each page links to the other.
7. The "Uses" chips name `morse-cli 0.14` and `morse-sdk 0.12`. Update them, and the "checked against" line, when the versions move.
8. The recipe card quotes "About 15 minutes" from the docs page. If the docs change it, change the card and the status label.
9. The landing card for the recipe carries a "Live" chip. This page avoids the word. Decide which wording wins and make the two agree.

## Open questions for the owner

The handover's list, with the questions about Site Importer alone left out and the original numbers kept. The owner has since decided 1 (two separate sites, with these palettes), 3 (the headline as designed) and 4 (the lamp says DOCS RECIPE).

1. Two recipes, two sites. A recipe is one docs page. Is a full site per recipe the right weight, or should these be one "Morse recipes" site with two pages? The designs work either way; the palettes assume two.
3. The headline "Agents publish. You keep the key." It is short and true (the owner key stays with you). "The agent publishes" would be more exact but does not fit on one line at the family's size. The landing's line, "Let any agent publish, under rights you can revoke", is the sub-headline's source.
4. The lamp says DOCS RECIPE, not LIVE. The other three sites open with LIVE or CHECK LIVE. Should a recipe site claim it?
5. Should the pages carry the SDK path as code? The docs show the CLI only and point to the SDK cookbooks, so the page does the same. An SDK tab would need its snippet type-checked against 0.12.0 first, as the landing's was.

## Measurement, before go-live

One primary event: clicks on "Read the recipe" (`data-cta="primary"`, `"nav"`, `"final"`). Also record the secondary button (`data-cta="secondary"`), uses of Copy (`data-copy`), tab changes, and clicks on the sibling bands (`data-link="agents"`, `"press"`). Copy is the best signal on the page: it is the moment a visitor takes the recipe with them.
