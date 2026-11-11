/**
 * Test Configuration for Template Customization
 *
 * This file contains all content-specific values used in E2E tests.
 * When customizing this template for a new organization, update these
 * values to match your content instead of modifying individual test files.
 *
 * This makes it easy to:
 * 1. Identify what needs to change when using the template
 * 2. Keep tests working with customized content
 * 3. Maintain a single source of truth for test expectations
 */

import { analyticsConfig, isConfigured } from '../src/lib/analytics.config'
import { siteConfig } from '../src/lib/site.config'

export const testConfig = {
  /**
   * Events Section Configuration
   * Used in: tests/events.spec.ts
   */
  events: {
    sectionId: 'events',
    heading: 'Upcoming Events',
    footerLinkText: 'Events',
    facebookLinkText: 'View all events on Facebook',
    // Sourced from siteConfig so the expected link always matches what the
    // Events component renders (single source of truth).
    facebookUrl: siteConfig.integrations.eventsFacebookPageUrl,
    descriptionText: 'volunteer opportunities',
    emptyStateHeading: 'No upcoming events right now',
    emptyStateButton: 'Follow us on Facebook',
  },

  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   */
  socialLinks: {
    facebook: {
      url: 'facebook.com/profile.php?id=61596415105545',
      ariaLabel: 'Facebook',
    },
    linkedin: {
      url: 'linkedin.com/company/144100405',
      ariaLabel: 'LinkedIn',
    },
  },

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   */
  copyright: {
    // Sourced from siteConfig so it tracks the name and tax-status label.
    text: `All Rights Are Reserved by ${siteConfig.name} ${siteConfig.taxStatusLabel}`,
    searchText: 'All Rights Are Reserved',
    // The permanent "Supported by" attribution (FFC footer standard) — sourced
    // from siteConfig.supportedBy, which is required and always rendered.
    supportedByUrl: siteConfig.supportedBy.url,
    supportedByText: siteConfig.supportedBy.name,
    // Sourced from siteConfig so the parent-org link expectations track the
    // footer (which now shows the org name, not the raw URL, as link text).
    linkUrl: siteConfig.parentOrg?.url ?? '',
    linkText: siteConfig.parentOrg?.name ?? siteConfig.name,
  },

  /**
   * Google Tag Manager Configuration
   * Used in: tests/google-tag-manager.spec.ts
   *
   * Sourced from the same src/lib/analytics.config.ts the component reads, so
   * the expected ID always matches what the build embedded. A charity site's
   * id is empty until its own container is provisioned; the site then renders
   * no tag, and the specs that need the tag itself skip (the consent test,
   * which needs only the dataLayer, still runs). `configured` uses the same
   * isConfigured() test the loader does.
   */
  googleTagManager: {
    id: analyticsConfig.gtmId.trim(),
    configured: isConfigured(analyticsConfig.gtmId),
  },

  /**
   * Logo Configuration
   * Used in: tests/logo.spec.ts
   */
  logo: {
    headerAlt: siteConfig.name,
    heroAlt: 'Hero image',
    navBarAriaLabel: `${siteConfig.name} home`,
  },

  /**
   * Cookie Consent Configuration
   * Used in: tests/cookie-consent.spec.ts
   */
  cookieConsent: {
    bannerHeading: 'We Value Your Privacy',
    modalHeading: 'Cookie Preferences',
    buttons: {
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
  },
}
