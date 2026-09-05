export function parseNumericColumn(rows: Record<string, string>[], column: string): number[] {
  const values: number[] = []
  for (const row of rows) {
    const raw = row[column]?.trim()
    if (!raw)
      continue
    const value = Number(raw)
    if (Number.isFinite(value))
      values.push(value)
  }
  return values
}

/**
 * Picks a sensible default column to analyze: the first header where a
 * majority of a sample of rows parse as finite numbers. Returns null if no
 * header qualifies, leaving the choice to the user.
 */
export function detectNumericColumn(headers: string[], rows: Record<string, string>[]): string | null {
  const sample = rows.slice(0, 50)
  if (sample.length === 0)
    return null

  for (const header of headers) {
    let numericCount = 0
    for (const row of sample) {
      const raw = row[header]?.trim()
      if (raw && Number.isFinite(Number(raw)))
        numericCount += 1
    }
    if (numericCount / sample.length > 0.5)
      return header
  }

  return null
}
