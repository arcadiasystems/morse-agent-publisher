import type { ReactNode } from 'react'
import { SectionHead } from '../base/SectionHead'

interface Transaction {
  by: 'you' | 'agent'
  /** The tile's own look: the agent's are tinted, your revoke has a bone border, the write after it is dashed and struck. */
  kind?: 'agent' | 'cut' | 'no'
  command: ReactNode
  text: string
  returns: string
}

/* The order of a cap's life. No digest, wallet or date is shown: none exists for an example. */
const TRANSACTIONS: Transaction[] = [
  { by: 'you', command: 'cap issue', text: "The cap goes to the agent's address.", returns: 'RETURNS · CAP ID, DIGEST' },
  {
    by: 'agent',
    kind: 'agent',
    command: 'entry add',
    text: 'A new post. Bytes to Walrus, the record to Sui.',
    returns: 'RETURNS · ENTRY ID, DIGEST',
  },
  {
    by: 'agent',
    kind: 'agent',
    command: (
      <>
        revision
        <br />
        publish-direct
      </>
    ),
    text: 'A correction is a new revision. The earlier one stays on the record.',
    returns: 'RETURNS · DIGEST',
  },
  { by: 'you', kind: 'cut', command: 'cap revoke', text: 'Takes effect on the next transaction.', returns: 'RETURNS · DIGEST' },
  {
    by: 'agent',
    kind: 'no',
    command: 'entry add',
    text: 'Aborts on chain. The cap is now a dead object in its wallet.',
    returns: 'NO RECORD WRITTEN',
  },
]

/** Five transaction tiles in order, each with the wallet that signed it, then what revoking does and does not undo. */
export function Audit() {
  return (
    <section className="sec" id="audit">
      <div className="wrap">
        <SectionHead
          label="Audit and revoke"
          title={
            <>
              The audit log <em>is Sui itself.</em>
            </>
          }
          lead="Every write the agent makes is a transaction signed by its own wallet. You do not ask the agent what it did. You read the record."
        />
        <ol className="txs" aria-label="Example: five transactions in order, each with the wallet that signed it">
          {TRANSACTIONS.map(({ by, kind, command, text, returns }, index) => (
            <li key={index} className={kind === undefined ? 'tx' : `tx ${kind}`}>
              <span className="tx__by">
                <i className={by === 'agent' ? 'keydot a' : 'keydot'} />
                {by === 'agent' ? 'THE AGENT' : 'YOU'}
              </span>
              <code>{command}</code>
              <p>{text}</p>
              <span className="tx__dg">{returns}</span>
            </li>
          ))}
        </ol>
        <div className="keeps">
          <div>
            <b>What it published stays.</b>
            <span>Revoking stops the next write. Nothing the agent already published disappears.</span>
          </div>
          <div>
            <b>A wrong post is yours to fix.</b>
            <span>Append a revision, or delete the entry, from your own wallet.</span>
          </div>
          <div>
            <b>One thing to know.</b>
            <span>
              <code>entry add</code> uploads to Walrus before it writes to Sui, so a write attempted after revocation
              still pays for the upload, then fails.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
