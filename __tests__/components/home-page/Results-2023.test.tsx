import React from 'react'
import { render, screen } from '@testing-library/react'

// Results-2023 renders four ResultCards → AnimatedNumber, which now uses native
// IntersectionObserver + matchMedia (stubbed in jest.setup.js to report
// prefers-reduced-motion: reduce), so the static value path is taken here.
// The section reads src/data/results.ts, which holds this site's real impact
// numbers (and is empty until there are some). Mock a populated module so the
// populated render stays covered whatever the site publishes.
jest.mock('@/data/results', () => ({
  results: {
    heading: 'Results - 2023',
    stats: [
      { value: '221', label: 'Organizational partners' },
      { value: '3', label: 'Total volunteers' },
      { value: '12', label: 'Programs delivered' },
      { value: '25', label: 'Volunteer hours contributed' },
    ],
  },
}))

import Results from '../../../src/components/home-page/Results-2023'

describe('Results-2023', () => {
  it('renders the section heading', () => {
    render(<Results />)
    expect(screen.getByRole('heading', { level: 2, name: /Results - 2023/i })).toBeInTheDocument()
  })

  it('mounts under the #results section landmark id', () => {
    const { container } = render(<Results />)
    expect(container.querySelector('#results')).not.toBeNull()
  })

  it('renders four stat cards', () => {
    const { container } = render(<Results />)
    // The section heading is an <h2>; each ResultCard wraps its value in an
    // <h3> (one level below the section), so there are 1 <h2> and 4 <h3>s.
    expect(container.querySelectorAll('h2').length).toBe(1)
    expect(container.querySelectorAll('h3').length).toBe(4)
  })
})
