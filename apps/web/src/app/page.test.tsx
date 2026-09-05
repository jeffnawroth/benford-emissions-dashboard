import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from './page'

describe('homePage', () => {
  it('renders the dashboard heading', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /benford dashboard/i })).toBeInTheDocument()
  })
})
