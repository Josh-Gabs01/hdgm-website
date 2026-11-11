import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/data/programs', () => {
  const programs = [
    { title: 'After-school tutoring', description: 'Homework help four days a week.' },
    { title: 'Weekend meals', description: 'Groceries for families every Saturday.' },
  ]
  return { programs, configuredPrograms: programs }
})

import Programs from '@/components/home-page/Programs'
import Hero from '@/components/home-page/Hero'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { asCharitySite, asSupporterSite, restoreSiteConfig } from '../../helpers/site-identity'

// The charity's own programs block (src/data/programs.ts). It owns the
// #programs anchor on a charity site, so the section and every link to it must
// appear and disappear together.
describe("Programs — the charity's own", () => {
  afterEach(() => restoreSiteConfig())

  it('renders one card per program under the #programs anchor', () => {
    asCharitySite()
    const { container } = render(<Programs />)
    expect(container.querySelector('#programs')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Our Programs' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'After-school tutoring',
      'Weekend meals',
    ])
    expect(screen.getByText('Groceries for families every Saturday.')).toBeInTheDocument()
  })

  it("renders nothing on the supporting organization's own site, which has its own block", () => {
    asSupporterSite()
    const { container } = render(<Programs />)
    expect(container).toBeEmptyDOMElement()
  })

  it('brings the Hero, Header and Footer links to #programs with it', () => {
    asCharitySite()
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Our Programs' })).toHaveAttribute('href', '#programs')
    render(<Header />)
    render(<Footer />)
    const links = screen.getAllByRole('link', { name: 'Programs' })
    expect(links.length).toBe(2)
    for (const link of links) expect(link).toHaveAttribute('href', '/#programs')
  })
})
