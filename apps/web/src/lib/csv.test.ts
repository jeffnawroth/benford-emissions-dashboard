import { describe, expect, it } from 'vitest'
import { detectNumericColumn, parseNumericColumn } from './csv'

describe('parseNumericColumn', () => {
  it('extracts finite numbers from the given column', () => {
    const rows = [{ amount: '10' }, { amount: '20.5' }, { amount: 'not-a-number' }, { amount: '' }]
    expect(parseNumericColumn(rows, 'amount')).toEqual([10, 20.5])
  })

  it('returns an empty array when the column is missing', () => {
    expect(parseNumericColumn([{ other: '1' }], 'amount')).toEqual([])
  })
})

describe('detectNumericColumn', () => {
  it('picks the first column where most sampled values are numeric', () => {
    const headers = ['name', 'amount']
    const rows = [
      { name: 'a', amount: '1' },
      { name: 'b', amount: '2' },
      { name: 'c', amount: '3' },
    ]
    expect(detectNumericColumn(headers, rows)).toBe('amount')
  })

  it('returns null when no column is majority-numeric', () => {
    const headers = ['name', 'note']
    const rows = [{ name: 'a', note: 'x' }, { name: 'b', note: 'y' }]
    expect(detectNumericColumn(headers, rows)).toBeNull()
  })

  it('returns null for an empty row set', () => {
    expect(detectNumericColumn(['amount'], [])).toBeNull()
  })
})
