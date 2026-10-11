import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Panda Mabati storefront', () => {
  it('renders the homepage and accessible primary navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /good roofs begin with better choices/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('navigation', { name: /main navigation/i }),
    ).toBeInTheDocument()
  })

  it('renders all roofing profiles', () => {
    render(<App />)

    for (const profile of ['D-Tile', 'Versatile', 'Box Profile', 'StarTile']) {
      expect(
        screen.getAllByRole('heading', { name: profile }).length,
      ).toBeGreaterThan(0)
    }
  })

  it('renders the quotation builder and PDF download action', () => {
    render(<App />)

    expect(
      screen.getAllByRole('heading', {
        name: /build your roofing quotation/i,
      }).length,
    ).toBeGreaterThan(0)

    expect(
      screen.getAllByRole('button', {
        name: /download quotation pdf/i,
      }).length,
    ).toBeGreaterThan(0)
  })
})
