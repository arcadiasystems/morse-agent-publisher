import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/tokens.css'
import '../src/styles/base.css'
import '../src/styles/agent-publisher.css'
import './card.css'
import './object.css'
import { AgentPublisherMark } from '../src/components/AgentPublisherMark'
import { Leash } from '../src/components/Hero'
import { Card } from './Card'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Card
      product="agent publisher"
      Mark={AgentPublisherMark}
      headline={
        <>
          Agents publish.
          <br />
          <em>You keep the key.</em>
        </>
      }
      tagline="A recipe for letting an AI agent publish."
      domain="agentpublisher.morsecms.xyz"
    >
      <Leash />
      <span className="pill sample og__sample">Example</span>
    </Card>
  </StrictMode>,
)
