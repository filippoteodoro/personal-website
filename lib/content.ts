type SocialLink = {
  label: string
  url: string
}

type BioTextSegment = {
  type: 'text'
  value: string
}

type BioLinkSegment = {
  type: 'link'
  label: string
  url: string
}

export type BioSegment = BioTextSegment | BioLinkSegment
export type BioParagraph = BioSegment[]

type SiteSchema = {
  jobTitle: string
  worksFor: string
  alumniOf: string[]
  addressLocality: string
  addressCountry: string
}

type SiteContent = {
  name: string
  location: string
  description: string
  currentRole: string
  bioParagraphs: BioParagraph[]
  bio: string[]
  interests: string[]
  social: SocialLink[]
  schema: SiteSchema
  url: string
}

function getBioSegmentText(segment: BioSegment): string {
  if (segment.type === 'link') {
    return segment.label
  }

  return segment.value
}

function getBioParagraphText(paragraph: BioParagraph): string {
  return paragraph.map(getBioSegmentText).join('')
}

const social: SocialLink[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/filippoteodoro/' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/filippoteodoro/' },
  { label: 'X', url: 'https://x.com/FilippoTeodoro' },
  { label: 'Facebook', url: 'https://www.facebook.com/teodorofilippo' },
  { label: 'GitHub', url: 'https://github.com/filippoteodoro' },
]

const bioParagraphs: BioParagraph[] = [
  [
    { type: 'text', value: 'Hello! I\'m Filippo Teodoro. I live in Milan and work in Strategy at ' },
    { type: 'link', label: 'Sky', url: 'https://www.sky.it/' },
    { type: 'text', value: '. On the side I love to build things online. I developed my corporate skills at ' },
    { type: 'link', label: 'McKinsey', url: 'https://www.mckinsey.com/it/our-work/private-equity' },
    { type: 'text', value: ' and ' },
    { type: 'link', label: 'Bain', url: 'https://www.bain.com/industry-expertise/private-equity/' },
    { type: 'text', value: ', mostly in private equity. There I learned what high standards mean, but also that slides and excels would only take me so far. Before that, I worked at ' },
    { type: 'link', label: 'Amazon', url: 'https://www.amazon.jobs/en/location/luxembourg-city-luxembourg' },
    { type: 'text', value: ', a machine learning ' },
    { type: 'link', label: 'hedge fund', url: 'https://www.euklid.uk.com/' },
    { type: 'text', value: ' in London and several startups.' },
  ],
  [
    { type: 'text', value: 'I grew up in a small town near Rome called Viterbo and used the internet to make it feel much bigger by launching ventures, learning about the world and playing video games. At the first opportunity I had, I flew as far from home as I could: I spent my first year of university in Buenos Aires, where I consolidated my confidence and realised that, if I was willing to give it a chance, the world could always teach me something I didn\'t know about myself. Then I also studied in Barcelona, Singapore <3 and Paris.' },
  ],
  [
    { type: 'text', value: 'Outside of work I love cultures, nature, sports, health, tech, finance, design, geopolitics, startups, music, fashion...' },
  ],
]

export const content: SiteContent = {
  name: 'Filippo Teodoro',
  location: 'Milan, Italy',
  description: 'Strategy at Sky. Builder. Curious about everything.',
  currentRole: 'Strategy Manager at Sky (CEO/CTO office), Milan',
  bioParagraphs,
  bio: bioParagraphs.map(getBioParagraphText),
  interests: ['cultures', 'nature', 'sports', 'health', 'tech', 'finance', 'design', 'geopolitics', 'startups', 'music', 'fashion'],
  social,
  schema: {
    jobTitle: 'Strategy Manager',
    worksFor: 'Sky',
    alumniOf: ['University of Bologna', 'ESSEC Business School'],
    addressLocality: 'Milan',
    addressCountry: 'IT',
  },
  url: 'https://filippoteodoro.com',
}
