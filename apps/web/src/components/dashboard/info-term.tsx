'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface InfoTermProps {
  title: string
  text: string
  children: React.ReactNode
}

/**
 * An underlined term that reveals an explanatory tooltip on hover — carried
 * over from the old app's SubtitleTooltip, which was the one piece of UX
 * worth deliberately preserving in the rewrite: plain-language explanations
 * of domain concepts (Benford's Law, fossil emissions, CO2-equivalents) for
 * non-expert users.
 */
export function InfoTerm({ title, text, children }: InfoTermProps) {
  const paragraphs = text.split(/(?<=\.)\s+/)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help underline decoration-dotted underline-offset-2">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="mb-1 font-semibold">{title}</p>
        {paragraphs.map(paragraph => (
          <p key={paragraph} className="mb-1 last:mb-0">{paragraph}</p>
        ))}
      </TooltipContent>
    </Tooltip>
  )
}
