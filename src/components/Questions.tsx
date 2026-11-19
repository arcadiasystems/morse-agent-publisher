import { Faq, type FaqItem } from '../base/Faq'
import { SectionHead } from '../base/SectionHead'

const QUESTIONS: FaqItem[] = [
  {
    question: 'Is Agent Publisher an app I install?',
    answer:
      'No. It is a documented way to do one job with tools that already exist: the Morse CLI and SDK. The recipe is a page in the Morse docs, with a rules file to copy. Nothing is hosted for you.',
  },
  {
    question: 'Does the agent ever hold my owner key?',
    answer:
      'No. The agent signs with its own wallet and holds one PublisherCap. Issuing and revoking caps needs the OwnerCap, which stays on your machine.',
  },
  {
    question: 'Which agents does it work with?',
    answer:
      'Any agent runtime with a shell. The rules file works as CLAUDE.md, AGENTS.md or Cursor rules. An agent built in TypeScript can call the SDK directly without shelling out.',
  },
  {
    question: 'What happens to its posts after I revoke?',
    answer:
      "They stay, with their records. Revocation takes effect on the agent's next transaction. If it published something wrong, you append a revision or delete the entry from your own wallet.",
  },
  {
    question: 'Does it run on Walrus Mainnet?',
    answer: (
      <>
        For public content, yes: pass <code>--network mainnet</code> or set <code>MORSE_NETWORK</code>. The recipe is
        written for Testnet, and the CLI targets Testnet unless you say otherwise. On Walrus Mainnet every write spends
        real SUI and WAL, and encrypted posts need your own Seal key-server credentials.
      </>
    ),
  },
  {
    question: 'How long does a post stay readable?',
    answer: (
      <>
        As long as its storage is paid for. Walrus storage is a lease counted in epochs, set with <code>--epochs</code>{' '}
        when the agent publishes. When a lease ends the content can go offline; the record of what was published, when
        and by which wallet remains on Sui.
      </>
    ),
  },
]

/** Six questions, as native <details>. */
export function Questions() {
  return (
    <section className="sec flush" id="faq">
      <div className="wrap">
        <SectionHead
          label="Questions"
          title={
            <>
              Before you <em>issue one.</em>
            </>
          }
        />
        <Faq items={QUESTIONS} />
      </div>
    </section>
  )
}
