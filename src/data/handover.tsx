import type { ReactNode } from 'react'

/**
 * One run of a code block as the page draws it. A plain string is text; `mark`
 * is highlighted text; `heading` is text in the comment colour; `note` is the
 * number beside a marked line and `caption` a line written for the reader of
 * this page. Notes and captions are not part of the file, so Copy leaves them out.
 */
export type CodePiece = string | { mark: string } | { heading: string } | { note: string } | { caption: string }

export interface HandoverNote {
  n: string
  title: string
  text: ReactNode
}

export interface HandoverFile {
  /** The tab's label. */
  tab: string
  /** What Copy says it copied, for the announcement. */
  name: string
  code: CodePiece[]
  notes: HandoverNote[]
}

/**
 * The three things the recipe hands the agent, as
 * https://docs.morsecms.xyz/agent-publishes.html gives them, wrapped to 57
 * characters with no word changed. Example content: the publication id is the
 * placeholder 0xYOUR_PUBLICATION_ID and the key is suiprivkey1...
 */
export const HANDOVER: HandoverFile[] = [
  {
    tab: 'CLAUDE.md',
    name: 'the CLAUDE.md snippet',
    code: [
      { heading: '# Morse' },
      '\nThis project publishes to a Morse publication on Sui\ntestnet. ',
      { mark: 'Before using the Morse CLI or SDK, read' },
      '\n',
      { mark: 'https://docs.morsecms.xyz/llms-full.txt' },
      ' (or',
      { note: '01' },
      '\nhttps://docs.morsecms.xyz/llms.txt for the index and\nfetch pages as .md).\n\nRules\n- Use the CLI non-interactively:\n  ',
      { mark: '`morse --json -q --yes ...`' },
      { note: '02' },
      '\n- ',
      { mark: 'Never run `account export`, never print' },
      '\n  ',
      { mark: 'MORSE_PRIVATE_KEY.' },
      { note: '03' },
      '\n- New post:\n  `morse entry add <name> --file <path> --epochs 30`\n- Edit an existing post:\n  `morse revision publish-direct <entryId>\n  --file <path> --epochs 30`\n- ',
      { mark: 'Look up entry ids in morse-map.json' },
      '; update it',
      { note: '04' },
      '\n  after every add.\n- Read back with `morse entry read <entryId>`.',
    ],
    notes: [
      {
        n: '01',
        title: 'Docs before commands.',
        text: 'The first lines send the agent to the full docs in one file, so it works from what is current and not from a guess.',
      },
      {
        n: '02',
        title: 'Never at a prompt.',
        text: (
          <>
            <code>--json</code> gives it something to parse, <code>-q</code> removes progress output,{' '}
            <code>--yes</code> removes confirmations.
          </>
        ),
      },
      {
        n: '03',
        title: 'The key stays unprinted.',
        text: 'The agent may not export its key or print it into a log.',
      },
      {
        n: '04',
        title: 'Ids come from a map.',
        text: 'A small file in the repo ties each post to its entry id, so the agent never guesses one.',
      },
    ],
  },
  {
    tab: 'its shell',
    name: "the agent's shell variables",
    code: [
      { heading: "# the agent's shell: its own key, never yours" },
      '\nexport ',
      { mark: 'MORSE_PRIVATE_KEY' },
      '=suiprivkey1...',
      { note: '01' },
      '\nexport ',
      { mark: 'MORSE_NETWORK' },
      '=testnet',
      { note: '02' },
      '\nexport ',
      { mark: 'MORSE_PUBLICATION' },
      '=0xYOUR_PUBLICATION_ID',
      { note: '03' },
      '\nexport MORSE_COLLECTION=posts',
    ],
    notes: [
      {
        n: '01',
        title: 'The agent wallet, not yours.',
        text: 'A fresh wallet with a small balance: SUI for gas, WAL for storage. Days of budget, not months. The owner key stays on your machine.',
      },
      {
        n: '02',
        title: 'Testnet first.',
        text: 'Walrus Mainnet is a deliberate choice: there is no faucet, and SUI and WAL are real money there.',
      },
      {
        n: '03',
        title: 'One publication.',
        text: 'The cap is bound to this publication and to nothing else you own.',
      },
    ],
  },
  {
    tab: 'its job',
    name: 'the example prompt',
    code: [
      { caption: '# the example prompt from the recipe' },
      '\n',
      { mark: "Every Friday, summarise the week's merged pull requests" },
      { note: '01' },
      '\nin this repo as a short Markdown post under\ncontent/posts/YYYY-MM-DD-weekly.md, then publish it to\nMorse as a new entry. ',
      { mark: 'Print the entry id and the Sui' },
      '\n',
      { mark: 'transaction digest when done.' },
      { note: '02' },
    ],
    notes: [
      {
        n: '01',
        title: 'Describe the outcome.',
        text: 'The agent has the docs, so the prompt says what to produce, not which commands to type.',
      },
      {
        n: '02',
        title: 'Ask for the proof.',
        text: 'The entry id and the digest are what you check afterwards.',
      },
      {
        n: '03',
        title: 'Review the first few.',
        text: "The recipe's own advice: read its first posts before you stop reviewing, and do not assume it read the docs.",
      },
    ],
  },
]

/** The text of a code block as a file: no note numbers, no captions, no leading blank line, one newline at the end. */
export function fileText(code: CodePiece[]): string {
  const text = code
    .map(piece => {
      if (typeof piece === 'string') return piece
      if ('mark' in piece) return piece.mark
      if ('heading' in piece) return piece.heading
      return ''
    })
    .join('')
  return `${text.replace(/^\n+/, '').replace(/[ \t]+$/gm, '')}\n`
}
