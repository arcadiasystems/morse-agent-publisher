import type { MarkProps } from '../base/TraceMark'

/** The Morse Agent Publisher mark: the Trace raised over a dot and a dash, A in Morse. Inline SVG cannot read CSS variables, so the magenta is a literal hex. */
export function AgentPublisherMark({ size }: MarkProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M8 60 V18 H36 V60 H64 V18 H92 V60"
        fill="none"
        stroke="#F4F2EC"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={15} cy={87} r={7} fill="#FF3EA5" />
      <rect x={30} y={80} width={62} height={14} rx={7} fill="#FF3EA5" />
    </svg>
  )
}
