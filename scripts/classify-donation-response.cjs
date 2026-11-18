/**
 * A provider challenge means automation could not verify the form, not that it
 * works. Only responses that Cloudflare's edge generates itself count: a 403
 * from the provider's own application (a private or removed form) carries none
 * of these signatures and stays a failure.
 */
function classifyDonationResponse({ provider, status, server = '', body = '', cfMitigated = '' }) {
  const fromCloudflare = provider === 'zeffy' && status === 403 && /cloudflare/i.test(server)
  // The block page: "Attention Required! | Cloudflare" + "Sorry, you have been blocked".
  const blockPage =
    /Attention Required!\s*(?:&#124;|\|)\s*Cloudflare/i.test(body) &&
    /Sorry, you have been blocked/i.test(body)
  // A managed or JavaScript challenge: Cloudflare marks the response with a
  // `cf-mitigated: challenge` header and serves its "Just a moment..." page.
  const challenge =
    /^challenge$/i.test(cfMitigated.trim()) ||
    /<title>\s*Just a moment\.\.\.\s*<\/title>/i.test(body)
  // A firewall rule (error 1020): "Access denied | <host> used Cloudflare to restrict access".
  const accessDenied = /<title>\s*Access denied\b[^<]*Cloudflare[^<]*<\/title>/i.test(body)
  if (fromCloudflare && (blockPage || challenge || accessDenied)) return 'automation-blocked'
  return status >= 200 && status < 400 ? 'reachable' : 'unreachable'
}

/**
 * What a blocked or failed donation probe actually received, for the run log:
 * enough to tell a bot challenge from a real outage without printing the page.
 */
function describeDonationResponse({ status, server = '', body = '', cfMitigated = '' }) {
  const title = (body.match(/<title[^>]*>([^<]{0,120})/i)?.[1] ?? '').trim()
  return `status ${status}, server "${server}", cf-mitigated "${cfMitigated}", title "${title}"`
}

module.exports = { classifyDonationResponse, describeDonationResponse }
