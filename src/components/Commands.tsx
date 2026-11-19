import { Fragment, type ReactNode } from 'react'
import { SectionHead } from '../base/SectionHead'
import { DOCS_SDK_COOKBOOKS } from '../lib/links'

interface StepProps {
  n: string
  /** Whose machine the step runs on. The agent's steps sit in the right lane, in magenta. */
  by: 'you' | 'agent'
  /** The grid row of the step, so both lanes keep time order: r1 to r5. */
  row: string
  children: ReactNode
  /** One shell command per item. A command may run over several lines. Example names: my-blog's post hello-world. */
  commands: string[]
}

/** One numbered step in a lane. Below 860px the lanes are one column and the pill says whose step it is. */
function Step({ n, by, row, children, commands }: StepProps) {
  return (
    <li className={by === 'agent' ? `step it ${row}` : `step ${row}`} data-n={n}>
      <span className={by === 'agent' ? 'pill lift who' : 'pill who'}>{by === 'agent' ? 'The agent' : 'You'}</span>
      <p>{children}</p>
      <pre>
        {commands.map((command, index) => (
          <Fragment key={command}>
            {index > 0 && '\n'}
            <span className="p">$</span>
            {` ${command}`}
          </Fragment>
        ))}
      </pre>
    </li>
  )
}

/** An empty cell in a lane: who is waiting while the other machine works. Hidden below 860px. */
function Idle({ place, children }: { place: string; children: string }) {
  return (
    <li className={`idle ${place}`} aria-hidden="true">
      {children}
    </li>
  )
}

/** Two lanes, your machine and the agent's shell, with the recipe's five commands in time order. */
export function Commands() {
  return (
    <section className="sec flush" id="run">
      <div className="wrap">
        <SectionHead
          label="The commands"
          title={
            <>
              Two machines. <em>Two keys.</em>
            </>
          }
          lead="Five steps, in order. Three run on your machine with the owner key. Two run in the agent's shell with a key that can publish to one publication and do nothing else."
        />
        <div className="lanes">
          <div className="lanes__hd" aria-hidden="true">
            <div>
              <i className="keydot" />
              YOUR MACHINE<small>OWNER KEY</small>
            </div>
            <div>
              <i className="keydot a" />
              THE AGENT'S SHELL<small>ITS OWN KEY</small>
            </div>
          </div>
          <ol>
            <Step n="01" by="you" row="r1" commands={['morse cap issue 0xAGENT_WALLET_ADDRESS']}>
              <b>Issue a cap</b> to the agent's address. It arrives in the same transaction; there is nothing to hand
              over.
            </Step>
            <Idle place="r1">NO CAP YET · IT CANNOT WRITE</Idle>
            <Step n="02" by="agent" row="r2" commands={['morse --json -q --yes status']}>
              <b>Check the setup.</b> Same context you have, with no keystore and no prompts.
            </Step>
            <Idle place="l r23">YOU ARE NOT IN THE LOOP · THE OWNER KEY STAYS HOME</Idle>
            <Step
              n="03"
              by="agent"
              row="r3"
              commands={[
                'morse --json -q --yes entry add \\\n    hello-world \\\n    --file posts/hello-world.md \\\n    --epochs 30',
              ]}
            >
              <b>Publish.</b> JSON comes back for it to read, with the entry id and the transaction digest.
            </Step>
            <Step n="04" by="you" row="r4" commands={['morse entry list', 'morse cap list 0xAGENT_WALLET_ADDRESS']}>
              <b>Look.</b> What exists now, and which caps that address holds, revoked ones included.
            </Step>
            <Step n="05" by="you" row="r5" commands={['morse cap revoke 0xAGENT_CAP_ID']}>
              <b>Revoke</b>, without touching the agent. The CLI asks you to confirm first.
            </Step>
            <Idle place="r45">AFTER STEP 05 · ITS NEXT WRITE ABORTS ON CHAIN</Idle>
          </ol>
        </div>
        <p className="fine">
          Commands and flags checked against morse-cli 0.14.0 with <code>--help</code> on 19 Nov 2026. All five steps
          ran on Testnet that day. Building the agent on the SDK? The same write is <code>addEntryFromBytes</code> with a{' '}
          <code>KeypairAdapter</code> made from the agent's key: see the{' '}
          <a href={DOCS_SDK_COOKBOOKS}>SDK cookbooks</a>.
        </p>
      </div>
    </section>
  )
}
