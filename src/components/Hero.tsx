import { ButtonLink } from '../base/ButtonLink'
import { StatusLabel } from '../base/StatusLabel'
import { DOCS_COOKBOOKS, DOCS_RECIPE } from '../lib/links'
import { AgentPublisherMark } from './AgentPublisherMark'

/* Example content, labelled "Example" on the object: a publication named my-blog. */
const CAP_ROWS = [
  { label: 'Bound to', value: "the agent's address" },
  { label: 'Scope', value: 'my-blog' },
  { label: 'Issued by', value: 'your OwnerCap' },
]

/* The cap's life in three commands. The rows light in turn on the hero's 12-second clock. */
const LIFE = [
  { command: 'cap issue', effect: 'the agent may write' },
  { command: 'entry add', effect: 'a digest comes back' },
  { command: 'cap revoke', effect: 'its next write aborts' },
]

/** The glass pass: the PublisherCap, hanging by its lanyard slot. */
function CapPass() {
  return (
    <article className="capc">
      <div className="capc__hd">
        <AgentPublisherMark size={34} />
        <span className="st">
          <span className="pill ok">Active</span>
          {/* The revoked state is an illustration on a loop: a screen reader hears the object's label and "Active". */}
          <span className="pill off" aria-hidden="true">
            Revoked
          </span>
        </span>
      </div>
      <small>PUBLISHERCAP</small>
      <h3>Write access, for one publication.</h3>
      <ul>
        {CAP_ROWS.map(({ label, value }) => (
          <li key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </li>
        ))}
      </ul>
      <div className="da" aria-hidden="true">
        <i />
        <i />
      </div>
    </article>
  )
}

/**
 * The hero object, the cap on its leash: your OwnerCap tile, a cord in the
 * shape of the Trace, the PublisherCap pass hanging from it, and the three
 * commands of its life. Also drawn on the share image (og/main.tsx).
 */
export function Leash() {
  return (
    <div
      className="leash"
      role="group"
      aria-label="Example: a PublisherCap on a leash. You issue it, the agent writes with it, you revoke it."
    >
      <div className="leash__in">
        <div className="owner">
          <small>YOUR MACHINE</small>
          <b>OwnerCap</b>
          <span>issues · revokes</span>
        </div>
        {/* Both paths end at the top centre of the pass, the origin of its swing and of its 3D turn. */}
        <svg className="cord" viewBox="0 0 520 548" aria-hidden="true">
          <path className="c0" d="M188 64 H356 V120" />
          <path className="c1" d="M188 64 H356 V120" />
        </svg>
        <div className="hang">
          <CapPass />
        </div>
        <div className="life">
          <div className="life__hd">
            <span>ONE CAP</span>
            <span>THREE COMMANDS</span>
          </div>
          <ol>
            {LIFE.map(({ command, effect }) => (
              <li key={command}>
                <code>{command}</code>
                <span>{effect}</span>
              </li>
            ))}
          </ol>
        </div>
        <span className="pill sample">Example</span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <span className="glow a" />
      <span className="glow b" />
      <div className="wrap hero__grid">
        <div className="hero__l">
          {/* The lamp cell does not say LIVE: a recipe is not a running thing. */}
          <StatusLabel cells={['DOCS RECIPE', 'CLI OR SDK', 'ABOUT 15 MINUTES']} word="PUBLISHER" />
          <h1 className="thin">
            Agents publish.
            <br />
            <em>You keep the key.</em>
          </h1>
          <p className="sub">
            A recipe for the Morse CLI and SDK. Give an AI agent a wallet of its own and publishing rights for one
            publication. It publishes without you, every write returns a transaction digest, and one command takes the
            rights back.
          </p>
          <div className="hero__cta">
            <ButtonLink variant="acc" label="Read the recipe" href={DOCS_RECIPE} leaves cta="primary" />
            <ButtonLink variant="ghost" label="Copy the CLAUDE.md snippet" href="#kit" cta="secondary" />
          </div>
          {/* Each run of text is one string, so it is one text node and measures as the design's does. */}
          <p className="hero__fine">
            {'A recipe in the '}
            <a href={DOCS_COOKBOOKS}>Morse cookbooks</a>
            {', not a hosted service. Nothing to sign up for.'}
          </p>
        </div>
        <Leash />
      </div>
    </section>
  )
}
