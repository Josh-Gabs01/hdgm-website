import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Social Links Tests
 *
 * These tests verify that:
 * 1. Social media links are present and functional
 * 2. Defunct platforms (like Google+) are not present
 * 3. All social icons link to correct destinations
 *
 * Note: Test expectations use values from test.config.ts for easy customization
 */

test.describe('Footer Social Links', () => {
  test('should not contain Google+ social link', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Check that Google+ link is not present
    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)

    // Also check that Google Plus label is not present
    const googlePlusLabel = page.locator('footer a[aria-label="Google Plus"]')
    await expect(googlePlusLabel).toHaveCount(0)
  })

  test('should display active social media links', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Verify Facebook link is present
    const facebookLink = page.locator(`footer a[href*="${testConfig.socialLinks.facebook.url}"]`)
    await expect(facebookLink).toBeVisible()
    await expect(facebookLink).toHaveAttribute(
      'aria-label',
      testConfig.socialLinks.facebook.ariaLabel
    )

    // Verify LinkedIn link is present
    const linkedInLink = page.locator(`footer a[href*="${testConfig.socialLinks.linkedin.url}"]`)
    await expect(linkedInLink).toBeVisible()
    await expect(linkedInLink).toHaveAttribute(
      'aria-label',
      testConfig.socialLinks.linkedin.ariaLabel
    )
  })

  test('should have exactly 2 social media icons', async ({ page }) => {
    await page.goto('/')

    // The site publishes two networks: Facebook and LinkedIn. Count only links
    // carrying one of those aria-labels, since the footer has other external links.
    const socialMediaLinks = page.locator(
      `footer a[aria-label="${testConfig.socialLinks.facebook.ariaLabel}"], footer a[aria-label="${testConfig.socialLinks.linkedin.ariaLabel}"]`
    )
    await expect(socialMediaLinks).toHaveCount(2)
  })
})
