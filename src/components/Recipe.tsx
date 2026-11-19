import type { ReactNode } from 'react'
import { SectionHead } from '../base/SectionHead'

interface Limit {
  n: string
  title: string
  text: ReactNode
}

const LIMITS: Limit[] = [
  { n: '01', title: 'You run it.', text: 'The recipe is a docs page. The tools are the Morse CLI and SDK, both before 1.0.' },
  {
    n: '02',
    title: 'Walrus Mainnet is real money.',
    text: "Public content works there, and the SDK's own word for it is usable but young. No faucet. Start on Testnet.",
  },
  {
    n: '03',
    title: 'Storage is a paid lease.',
    text: (
      <>
        <code>--epochs</code> sets how long the content is paid for. When the lease ends the content can go offline,
        while the record on Sui remains.
      </>
    ),
  },
  {
    n: '04',
    title: 'Encryption is Testnet-ready only.',
    text: 'Seal works out of the box on Testnet. On Walrus Mainnet you supply your own Seal key-server credentials.',
  },
]

/* The recipe's own facts, from the head of its docs page. */
const FACTS = [
  { label: 'Time', value: 'About 15 minutes' },
  { label: 'Tools', value: 'The Morse CLI or SDK' },
  { label: 'Agent', value: 'An agent runtime with a shell' },
  { label: 'Wallets', value: "Two. Yours keeps the OwnerCap; the agent's holds a little SUI and WAL." },
  { label: 'Network', value: 'Written for Testnet. Public content also runs on Walrus Mainnet.' },
]

/** What this is: four numbered limits beside the recipe card, an index card with the recipe's facts on ruled lines. */
export function Recipe() {
  return (
    <section className="sec" id="recipe">
      <div className="wrap two">
        <div>
          <SectionHead
            label="What this is"
            title={
              <>
                A recipe.
                <br />
                <em>Not a service.</em>
              </>
            }
            lead="Nothing here is hosted for you, and no account stands between your agent and your publication. That is the point. It also leaves four things for you to know."
          />
          <ul className="limits">
            {LIMITS.map(({ n, title, text }) => (
              <li key={n}>
                <span className="n">{n}</span>
                <div>
                  <b>{title}</b>
                  <span className="d">{text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rcardbox">
          <span className="glow" />
          <div className="rcard">
            <div className="rcard__hd">
              <b>Let an AI agent publish</b>
              <span className="pill lift">Docs recipe</span>
            </div>
            <dl>
              {FACTS.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
