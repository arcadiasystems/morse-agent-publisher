import { useEffect, useRef, useState } from 'react'
import { SectionHead } from '../base/SectionHead'
import { useTabs } from '../base/useTabs'
import { fileText, HANDOVER, type CodePiece } from '../data/handover'
import { copyText, selectContents } from '../lib/clipboard'

/** How long the button reads "Copied" before it offers to copy again. */
const COPIED_MS = 1600

/** The outcome of the last press of Copy, and the tab it was pressed on. */
interface CopyResult {
  tab: number
  copied: boolean
}

function Code({ code }: { code: CodePiece[] }) {
  return code.map((piece, index) => {
    if (typeof piece === 'string') return piece
    if ('mark' in piece) return <mark key={index}>{piece.mark}</mark>
    if ('heading' in piece) {
      return (
        <span key={index} className="c">
          {piece.heading}
        </span>
      )
    }
    if ('caption' in piece) {
      return (
        <span key={index} className="c nc">
          {piece.caption}
        </span>
      )
    }
    return <sup key={index}>{piece.note}</sup>
  })
}

/**
 * The handover, as a file viewer with three tabs: the rules file, the agent's
 * shell and its job. Copy puts the visible file on the clipboard, without the
 * note numbers.
 */
export function Kit() {
  const { selected, tabProps, panelProps } = useTabs(HANDOVER.length)
  const [result, setResult] = useState<CopyResult | null>(null)
  const blocks = useRef<(HTMLPreElement | null)[]>([])
  const reset = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(reset.current), [])

  const copy = async () => {
    const tab = selected
    window.clearTimeout(reset.current)
    const copied = await copyText(fileText(HANDOVER[tab].code))
    setResult({ tab, copied })
    if (copied) {
      reset.current = window.setTimeout(() => setResult(null), COPIED_MS)
      return
    }
    /* The browser refused: leave the text selected, so one keystroke copies it. */
    const block = blocks.current[tab]
    if (block) selectContents(block)
  }

  /* A result belongs to the tab it was copied from; on another tab the button is fresh. */
  const shown = result !== null && result.tab === selected ? result : null
  const label = shown === null ? 'Copy' : shown.copied ? 'Copied' : 'Select and copy'
  const said =
    shown === null
      ? ''
      : shown.copied
        ? `Copied ${HANDOVER[shown.tab].name} to the clipboard.`
        : 'Copying was blocked. The text is selected: copy it from the keyboard.'

  return (
    <section className="sec" id="kit">
      <div className="wrap">
        <SectionHead
          label="The handover"
          title={
            <>
              Treat it like a contractor.
              <br />
              <em>Hand it three things.</em>
            </>
          }
          lead="A rules file so it starts from the docs, a shell with its own key, and a job described by its outcome. All three come from the recipe; copy them and change the names."
        />
        <div className="glass kit" data-tabs>
          <div className="kit__bar">
            <div className="kit__tabs" role="tablist" aria-label="What you hand the agent">
              {HANDOVER.map(({ tab }, index) => (
                <button
                  key={tab}
                  className={index === selected ? 'ftab is-on' : 'ftab'}
                  type="button"
                  {...tabProps(index)}
                >
                  <i aria-hidden="true" />
                  {tab}
                </button>
              ))}
            </div>
            <button className="copy" type="button" data-copy onClick={copy}>
              {label}
            </button>
            {/* The confirmation for a screen reader. The button's own label is the visible one. */}
            <span className="said" role="status">
              {said}
            </span>
          </div>
          {HANDOVER.map(({ tab, code, notes }, index) => (
            <div key={tab} className="kit__pane" {...panelProps(index)} tabIndex={0}>
              <pre
                ref={node => {
                  blocks.current[index] = node
                }}
              >
                <Code code={code} />
              </pre>
              <ul className="notes">
                {notes.map(({ n, title, text }) => (
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
          ))}
        </div>
        <p className="fine">
          The rules file works as <code>CLAUDE.md</code>, <code>AGENTS.md</code> or Cursor rules. Text from the recipe,
          wrapped to fit; the wording is unchanged.
        </p>
      </div>
    </section>
  )
}
