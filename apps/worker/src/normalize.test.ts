import type { OwidData, OwidMetadata } from './normalize'
import { describe, expect, it } from 'vitest'
import { normalizeOwidResponse } from './normalize'

describe('normalizeOwidResponse', () => {
  const metadata: OwidMetadata = {
    name: 'Annual CO₂ emissions',
    unit: 'tonnes',
    presentation: { attributionShort: 'Global Carbon Budget' },
    origins: [{ citationFull: 'Global Carbon Project (2024)' }],
    dimensions: {
      entities: {
        values: [
          { id: 1, name: 'Germany', code: 'DEU' },
          { id: 2, name: 'France', code: 'FRA' },
        ],
      },
    },
  }

  it('zips the columnar arrays into records', () => {
    const data: OwidData = {
      entities: [1, 1, 2],
      years: [2020, 2021, 2020],
      values: [100, 110, 90],
    }

    const result = normalizeOwidResponse(data, metadata)

    expect(result.records).toEqual([
      { countryId: 1, year: 2020, value: 100 },
      { countryId: 1, year: 2021, value: 110 },
      { countryId: 2, year: 2020, value: 90 },
    ])
  })

  it('derives sorted unique years', () => {
    const data: OwidData = { entities: [1, 1, 2], years: [2021, 2019, 2020], values: [1, 2, 3] }
    const result = normalizeOwidResponse(data, metadata)
    expect(result.years).toEqual([2019, 2020, 2021])
  })

  it('prefers origins citation over attributionShort', () => {
    const data: OwidData = { entities: [], years: [], values: [] }
    const result = normalizeOwidResponse(data, metadata)
    expect(result.citation).toBe('Global Carbon Project (2024)')
  })

  it('falls back to attributionShort when no origins citation exists', () => {
    const data: OwidData = { entities: [], years: [], values: [] }
    const metaWithoutOrigins: OwidMetadata = { ...metadata, origins: [] }
    const result = normalizeOwidResponse(data, metaWithoutOrigins)
    expect(result.citation).toBe('Global Carbon Budget')
  })

  it('carries through the country list and unit/name fields', () => {
    const data: OwidData = { entities: [], years: [], values: [] }
    const result = normalizeOwidResponse(data, metadata)
    expect(result.name).toBe('Annual CO₂ emissions')
    expect(result.unit).toBe('tonnes')
    expect(result.countries).toEqual(metadata.dimensions.entities.values)
  })

  it('skips misaligned/short array entries defensively', () => {
    const data: OwidData = { entities: [1, 2], years: [2020], values: [10, 20] }
    const result = normalizeOwidResponse(data, metadata)
    expect(result.records).toEqual([{ countryId: 1, year: 2020, value: 10 }])
  })
})
