import { createRequire } from 'module'
import path from 'path'

const requireScript = createRequire(path.join(process.cwd(), 'package.json'))
const { classifyDonationResponse } = requireScript('./scripts/classify-donation-response.cjs')

const block = {
  provider: 'zeffy',
  status: 403,
  server: 'cloudflare',
  body: '<title>Attention Required! | Cloudflare</title><h1>Sorry, you have been blocked</h1>',
}

describe('donation response classification', () => {
  it('reports the exact observed Zeffy challenge as unverified by automation', () => {
    expect(classifyDonationResponse(block)).toBe('automation-blocked')
  })
  it.each([
    // A managed challenge, marked by Cloudflare's own response header.
    { ...block, body: '', cfMitigated: 'challenge' },
    // The same challenge recognised from its page when the header is absent.
    { ...block, body: '<title>Just a moment...</title>' },
    // A firewall rule (error 1020).
    {
      ...block,
      body: '<title>Access denied | www.zeffy.com used Cloudflare to restrict access</title>',
    },
  ])('treats other Cloudflare edge responses as unverified too: %j', (response) => {
    expect(classifyDonationResponse(response)).toBe('automation-blocked')
  })
  it.each([
    // Not served by Cloudflare, or not a 403: the signatures alone prove nothing.
    { ...block, body: '', cfMitigated: 'challenge', server: 'nginx' },
    { ...block, body: '<title>Just a moment...</title>', status: 503 },
  ])('does not accept a challenge signature out of context: %j', (response) => {
    expect(classifyDonationResponse(response)).toBe('unreachable')
  })
  it('describes what a probe received without printing the page', () => {
    expect(
      requireScript('./scripts/classify-donation-response.cjs').describeDonationResponse({
        ...block,
        cfMitigated: 'challenge',
      })
    ).toBe(
      'status 403, server "cloudflare", cf-mitigated "challenge", title "Attention Required! | Cloudflare"'
    )
  })
  it.each([
    { ...block, provider: 'paypal' },
    { ...block, status: 404 },
    { ...block, server: 'nginx' },
    { ...block, body: 'Forbidden' },
    { ...block, body: '<h1>Sorry, you have been blocked</h1>' },
  ])('keeps ordinary errors as failures: %j', (response) => {
    expect(classifyDonationResponse(response)).toBe('unreachable')
  })
  it('accepts a successful provider response', () => {
    expect(classifyDonationResponse({ provider: 'zeffy', status: 200 })).toBe('reachable')
  })
  it('keeps connection failures as failures', () => {
    expect(classifyDonationResponse({ provider: 'zeffy', status: 0 })).toBe('unreachable')
  })
})
