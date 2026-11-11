// Testimonials data
// Each testimonial needs a heading and text; name, location, and locationUrl
// are optional (location renders as a link when locationUrl is present).
// The list is empty until the charity has testimonials of its own to publish;
// the Testimonials section hides itself while it is.

export type Testimonial = {
  heading: string
  text: string
  name?: string
  location?: string
  locationUrl?: string
}

export const testimonials: Testimonial[] = []

// Keeps only entries with the required `heading` and `text` populated, so the
// section self-hides rather than rendering empty quotes.
export const configuredTestimonials: Testimonial[] = testimonials.filter(
  (t) =>
    typeof t.heading === 'string' &&
    t.heading.trim().length > 0 &&
    typeof t.text === 'string' &&
    t.text.trim().length > 0
)
