export type EmissionKind = 'co2' | 'ghg'

export const INDICATOR_IDS: Record<EmissionKind, number> = {
  co2: 944146,
  ghg: 899063,
}

export interface OwidData {
  entities: number[]
  years: number[]
  values: number[]
}

export interface OwidMetadata {
  name: string
  unit: string
  presentation?: {
    attributionShort?: string
  }
  origins?: {
    citationFull?: string
  }[]
  dimensions: {
    entities: {
      values: { id: number, name: string, code: string }[]
    }
  }
}

export interface NormalizedCountry {
  id: number
  name: string
  code: string
}

export interface NormalizedRecord {
  countryId: number
  year: number
  value: number
}

export interface NormalizedDataset {
  name: string
  unit: string
  citation: string
  countries: NormalizedCountry[]
  years: number[]
  records: NormalizedRecord[]
}

/**
 * Converts OWID's raw columnar response (three parallel arrays + a metadata
 * document mirroring its exact API schema) into a stable domain shape the
 * frontend depends on instead of a third-party API's response format.
 */
export function normalizeOwidResponse(data: OwidData, metadata: OwidMetadata): NormalizedDataset {
  const records: NormalizedRecord[] = []
  for (let i = 0; i < data.entities.length; i++) {
    const year = data.years[i]
    const value = data.values[i]
    const countryId = data.entities[i]
    if (countryId === undefined || year === undefined || value === undefined)
      continue
    records.push({ countryId, year, value })
  }

  const years = [...new Set(data.years)].sort((a, b) => a - b)
  const citation = metadata.origins?.[0]?.citationFull ?? metadata.presentation?.attributionShort ?? ''

  return {
    name: metadata.name,
    unit: metadata.unit,
    citation,
    countries: metadata.dimensions.entities.values,
    years,
    records,
  }
}
