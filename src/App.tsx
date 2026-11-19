import { FinalBand } from './base/FinalBand'
import { Footer } from './base/Footer'
import { Nav } from './base/Nav'
import { AgentPublisherMark } from './components/AgentPublisherMark'
import { Audit } from './components/Audit'
import { Commands } from './components/Commands'
import { Family } from './components/Family'
import { Hero } from './components/Hero'
import { Kit } from './components/Kit'
import { Questions } from './components/Questions'
import { Recipe } from './components/Recipe'
import { Scope } from './components/Scope'
import { Why } from './components/Why'
import { DOCS, DOCS_RECIPE, GITHUB, MORSE, MORSE_AGENTS, MORSE_PRESS, MORSE_RECEIPTS, MORSE_SITE_IMPORTER } from './lib/links'

const NAV_LINKS = [
  { label: 'The handover', href: '#kit' },
  { label: 'The commands', href: '#run' },
  { label: 'Audit and revoke', href: '#audit' },
  { label: 'Scope', href: '#scope' },
  { label: 'Questions', href: '#faq' },
]

const FOOTER_LINKS = [
  { label: 'Morse kit', href: MORSE, link: 'morse' },
  { label: 'Agents', href: MORSE_AGENTS, link: 'agents' },
  { label: 'Press', href: MORSE_PRESS, link: 'press' },
  { label: 'Receipts', href: MORSE_RECEIPTS, link: 'receipts' },
  { label: 'Site Importer', href: MORSE_SITE_IMPORTER, link: 'site-importer' },
  { label: 'Docs', href: DOCS },
  { label: 'GitHub', href: GITHUB },
]

export default function App() {
  return (
    <>
      <Nav
        product="Agent Publisher"
        Mark={AgentPublisherMark}
        links={NAV_LINKS}
        morseHref={MORSE}
        action={{ label: 'Read the recipe', href: DOCS_RECIPE, leaves: true, cta: 'nav' }}
      />
      <main>
        <Hero />
        <Why />
        <Kit />
        <Commands />
        <Audit />
        <Scope />
        <Recipe />
        <Family />
        <Questions />
        <FinalBand
          Mark={AgentPublisherMark}
          headline={
            <>
              Issue a cap.
              <br />
              <em>Revoke it any time.</em>
            </>
          }
          primary={{ label: 'Read the recipe', href: DOCS_RECIPE, leaves: true, cta: 'final' }}
          secondary={{ label: 'Copy the CLAUDE.md snippet', href: '#kit', cta: 'final-secondary' }}
        />
      </main>
      <Footer
        product="Agent Publisher"
        Mark={AgentPublisherMark}
        links={FOOTER_LINKS}
        line="Morse Agent Publisher: a recipe for letting an agent publish. Part of Morse, built by Arcadia Systems with a grant from the Walrus Foundation. © 2026 · Open source, MIT licence"
      />
    </>
  )
}
