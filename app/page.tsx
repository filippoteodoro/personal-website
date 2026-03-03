import ContactForm from './components/ContactForm'
import { content } from '@/lib/content'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: content.name,
  url: content.url,
  jobTitle: 'Strategy Manager',
  worksFor: { '@type': 'Organization', name: 'Sky' },
  address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Bologna' },
    { '@type': 'CollegeOrUniversity', name: 'ESSEC Business School' },
  ],
  sameAs: content.social.map(s => s.url),
}

const linkClass = "underline underline-offset-2"
const navLinkClass = "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

        <section className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
            <p>
              Hello! I&apos;m Filippo Teodoro. I live in Milan and work in Strategy at{' '}
              <a href="https://www.sky.it/" target="_blank" rel="noopener noreferrer" className={linkClass}>Sky</a>.
              {' '}On the side I love to build things online. I developed my corporate skills at{' '}
              <a href="https://www.mckinsey.com/it/our-work/private-equity" target="_blank" rel="noopener noreferrer" className={linkClass}>McKinsey</a>
              {' '}and{' '}
              <a href="https://www.bain.com/industry-expertise/private-equity/" target="_blank" rel="noopener noreferrer" className={linkClass}>Bain</a>,
              mostly in private equity. There I learned what high standards mean, but also that
              slides and excels would only take me so far. Before that, I worked at{' '}
              <a href="https://www.amazon.jobs/en/location/luxembourg-city-luxembourg" target="_blank" rel="noopener noreferrer" className={linkClass}>Amazon</a>,
              a machine learning{' '}
              <a href="https://www.euklid.uk.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>hedge fund</a>
              {' '}in London and several startups.
            </p>
            <p>
              I grew up in a small town near Rome called Viterbo and used the internet to make it
              feel much bigger by launching ventures, learning about the world and playing video
              games. At the first opportunity I had, I flew as far from home as I could: I spent
              my first year of university in Buenos Aires, where I consolidated my confidence and
              realised that if I was willing to give it a chance, each side of the world could teach me
              something I didn&apos;t know about myself. Then I also studied in Barcelona,
              Singapore &lt;3 and Paris.
            </p>
            <p>
              Outside of work I love cultures, nature, sports, health, tech, finance, design,
              geopolitics, startups, music, fashion&hellip;
            </p>
          </div>
          <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-2">
            {content.social.map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
                {label} ↗
              </a>
            ))}
          </nav>
        </section>

        <hr className="border-gray-100 dark:border-gray-800 mb-6" />

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Drop a message — I read everything</h2>
          <ContactForm />
        </section>

        <footer className="mt-20 text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Filippo Teodoro
        </footer>

      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
