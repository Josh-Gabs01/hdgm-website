// Impact / results statistics shown in the "Results" section of the home page.
// To update the heading or the stat cards, edit this file — no need to touch
// the component. `value` is rendered as-is; if it is a plain integer string the
// component animates the count up to it.
//
// `stats` is empty until the organization has measured results to report; the
// section hides itself while it is. Add entries like
// { value: '120', label: 'Children sponsored to attend school' }.

export type ResultStat = {
  value: string
  label: string
}

export const results: { heading: string; stats: ResultStat[] } = {
  heading: 'Our Impact',
  stats: [],
}
