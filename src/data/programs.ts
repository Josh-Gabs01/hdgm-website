// The charity's own programs, shown in the "Our Programs" section of the home
// page. To add, remove or reword a program, edit this list — no need to touch
// the component. An empty list hides the section and its navigation links.

export type Program = {
  title: string
  description: string
}

export const programs: Program[] = [
  {
    title: 'Education and Learning Support',
    description:
      'We are committed to creating educational opportunities for underserved children by supporting access to learning resources, school supplies, educational assistance, and initiatives that help children build a brighter future.',
  },
  {
    title: "Children's Welfare and Development",
    description:
      'We are dedicated to improving the well-being of vulnerable and underserved children by supporting their basic needs, providing access to essential resources, and creating safe, nurturing environments where every child can grow, learn, and thrive.',
  },
  {
    title: 'Youth Empowerment and Skills Development',
    description:
      'We empower young people through vocational training, mentorship, leadership development, life skills, and opportunities for economic independence. Our goal is to equip the next generation with the knowledge, confidence, and practical skills needed to build successful futures and contribute positively to their communities.',
  },
]

// Mirrors `configuredTeam`: only programs with a title and a description.
export const configuredPrograms: Program[] = programs.filter(
  (p) => p.title.trim().length > 0 && p.description.trim().length > 0
)
