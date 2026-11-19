import { Band } from '../base/Band'
import { Lockup } from '../base/Lockup'
import { TraceMark } from '../base/TraceMark'
import { MORSE_AGENTS, MORSE_PRESS } from '../lib/links'
import { PressMark } from './PressMark'

/* Update with the "checked against" line in Commands when the versions move. */
const USES = ['morse-cli 0.14', 'morse-sdk 0.12', 'Sui', 'Walrus']

/** Two glass bands to the sibling products, each wordmark in its own colour, then what the recipe uses. */
export function Family() {
  return (
    <section className="sec flush" id="family">
      <div className="wrap">
        <div className="bands">
          <Band
            href={MORSE_AGENTS}
            link="agents"
            lockup={<Lockup product="agents" Mark={TraceMark} markSize={40} productColor="#C6F135" fontSize={22} />}
            title="Want the whole agent, not only its publish step?"
            text="Morse Agents is an open template for developers: memory, publishing, proof and gating built once, with a brain you write. The template is on its way and not shipped yet."
            action="Open Morse Agents"
          />
          <Band
            href={MORSE_PRESS}
            link="press"
            lockup={<Lockup product="press" Mark={PressMark} markSize={40} productColor="#FF5A36" fontSize={22} />}
            title="Would rather not run an agent yourself?"
            text="Morse Press sets one up from a form. You choose its sources, its brain and its voice, and it runs your journal."
            action="Open Morse Press"
          />
        </div>
        <div className="runs">
          <span className="lab">Uses</span>
          {USES.map(name => (
            <span key={name} className="pill">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
