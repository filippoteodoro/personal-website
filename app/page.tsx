import ContactForm from './components/ContactForm'
import { content } from '@/lib/content'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${content.url}#person`,
  name: content.name,
  description: content.description,
  url: content.url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': content.url },
  jobTitle: content.currentRole,
  worksFor: { '@type': 'Organization', name: 'Sky' },
  address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Bologna' },
    { '@type': 'CollegeOrUniversity', name: 'ESSEC Business School' },
  ],
  knowsAbout: content.interests,
  sameAs: content.social.map(socialLink => socialLink.url),
}

const linkClass = 'underline underline-offset-2'
const navLinkClass = 'text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
const externalLinkAttributes = { target: '_blank', rel: 'noopener noreferrer' } as const

type ExternalLinkProps = Readonly<{
  href: string
  children: React.ReactNode
}>

function ExternalLink({ href, children }: ExternalLinkProps): React.JSX.Element {
  return (
    <a href={href} className={linkClass} {...externalLinkAttributes}>
      {children}
    </a>
  )
}

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="sr-only">
          {content.name} - {content.description}
        </h1>
        <section className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
            <p>
              Hello! I&apos;m Filippo Teodoro. I live in Milan and work in Strategy at{' '}
              <ExternalLink href="https://www.sky.it/">Sky</ExternalLink>. On the side I love to build things online.
              I developed my corporate skills at{' '}
              <ExternalLink href="https://www.mckinsey.com/it/our-work/private-equity">McKinsey</ExternalLink> and{' '}
              <ExternalLink href="https://www.bain.com/industry-expertise/private-equity/">Bain</ExternalLink>, mostly in
              private equity. There I learned what high standards mean, but also that slides and excels would only take me
              so far. Before that, I worked at{' '}
              <ExternalLink href="https://www.amazon.jobs/en/location/luxembourg-city-luxembourg">Amazon</ExternalLink>,
              a machine learning <ExternalLink href="https://www.euklid.uk.com/">hedge fund</ExternalLink> in London and
              several startups.
            </p>
            <p>
              I grew up in a small town near Rome called Viterbo and used the internet to make it feel much bigger by
              launching ventures, learning about the world and playing video games. At the first opportunity I had, I flew
              as far from home as I could: I spent my first year of university in Buenos Aires, where I consolidated my
              confidence and realised that if I was willing to give it a chance, each side of the world could teach me
              something I didn&apos;t know about myself. Then I also studied in Barcelona, Singapore &lt;3 and Paris.
            </p>
            <p>
              Outside of work I love cultures, nature, sports, health, tech, finance, design, geopolitics, startups,
              music, fashion...
            </p>
          </div>
          <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-2">
            {content.social.map(({ label, url }) => (
              <a key={label} href={url} className={navLinkClass} {...externalLinkAttributes}>
                {label} &gt;
              </a>
            ))}
          </nav>
        </section>

        <hr className="border-gray-100 dark:border-gray-800 mb-6" />

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Drop a message
          </h2>
          <ContactForm />
        </section>

        <footer className="mt-20 text-xs text-gray-500 dark:text-gray-500">&copy; {new Date().getFullYear()} Filippo Teodoro</footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
