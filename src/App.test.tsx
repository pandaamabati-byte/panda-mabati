import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Panda Mabati application', () => {
  it('renders the homepage and primary navigation', () => {
    render(<App />)
    expect(screen.getByRole('heading', {
      name: /build with confidence/i,
    })).toBeInTheDocument()
    expect(screen.getByRole('navigation', {
      name: /main navigation/i,
    })).toBeInTheDocument()
  })
})
