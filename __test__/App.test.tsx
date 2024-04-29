import { describe, expect, test } from 'vitest'
import { render, screen } from './utils/test-utils'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'

describe('Simple working App test', () => {
  test('renders the first render', () => {
    render(<App />, { wrapper: BrowserRouter })
    expect(screen.getByText('React Template')).toBeInTheDocument()
  })

  test('render header', () => {
    render(<App />, { wrapper: BrowserRouter })
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
