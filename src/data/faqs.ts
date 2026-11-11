export type Faq = { question: string; answer: string }

// The template's FAQ answered questions about the supporting organization's own
// programs, so it is published only on that organization's site — see
// faqSectionVisible() in src/lib/section-visibility.ts, which gates both the
// FAQ section and the FAQPage JSON-LD built from this list. This site has no
// FAQ of its own yet, so the list is empty.
export const faqs: Faq[] = []
