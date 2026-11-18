import React from 'react'
import { render, screen } from '@testing-library/react'

import Footer from '@/components/footer'
import Donate from '@/components/home-page/SupportFreeForCharity'
import DonationPolicy from '@/app/donation-policy/page'
import { siteConfig, taxStatusNotice } from '@/lib/site.config'
import { asCharitySite, restoreSiteConfig } from '../helpers/site-identity'

// Donors must be told where the organization's tax-exempt status stands while
// it holds none: the notice appears beside the Donate button, in the donation
// policy and in the footer of every page — and disappears, everywhere, the
// moment `taxStatusLabel` claims the status, so the two can never disagree.
const NOTICE = "Riverbend Test Pantry's application for 501(c)(3) status is pending with the IRS."

describe('tax-status notice', () => {
  afterEach(() => restoreSiteConfig())

  it('is shown in the Donate section, the donation policy and the footer', () => {
    asCharitySite({ taxStatusLabel: '', taxStatusNotice: NOTICE })
    for (const ui of [<Donate key="d" />, <DonationPolicy key="p" />, <Footer key="f" />]) {
      const { unmount } = render(ui)
      expect(screen.getByText(NOTICE)).toBeInTheDocument()
      unmount()
    }
  })

  it('keeps the policy from calling donations tax-deductible while pending', () => {
    asCharitySite({ taxStatusLabel: '', taxStatusNotice: NOTICE })
    const { container } = render(<DonationPolicy />)
    expect(container.textContent).toMatch(/donations may not be tax-deductible/)
    expect(container.textContent).not.toMatch(/is a qualified 501\(c\)\(3\)/)
  })

  it('is dropped everywhere once the status is held', () => {
    asCharitySite({ taxStatusLabel: 'a US 501c3 Non Profit', taxStatusNotice: NOTICE })
    expect(taxStatusNotice()).toBeNull()
    for (const ui of [<Donate key="d" />, <DonationPolicy key="p" />, <Footer key="f" />]) {
      const { unmount } = render(ui)
      expect(screen.queryByText(NOTICE)).toBeNull()
      unmount()
    }
  })

  it('shows nothing when no notice is configured', () => {
    asCharitySite({ taxStatusLabel: '', taxStatusNotice: '' })
    expect(taxStatusNotice()).toBeNull()
  })

  it('this site tells donors its application is pending with the IRS', () => {
    expect(siteConfig.taxStatusLabel).toBe('')
    expect(taxStatusNotice()).toMatch(/501\(c\)\(3\).*pending with the IRS/)
  })
})
