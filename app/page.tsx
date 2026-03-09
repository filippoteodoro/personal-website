import { Fragment } from 'react'
import ContactForm from './components/ContactForm'
import { content, type BioSegment } from '@/lib/content'

const linkClass = 'underline underline-offset-2'
const navLinkClass = 'text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
const externalLinkAttributes = { target: '_blank', rel: 'noopener noreferrer' } as const

type ExternalLinkProps = Readonly<{
  href: string
  children: React.ReactNode
}>

function getPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${content.url}#person`,
    name: content.name,
    description: content.description,
    url: content.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': content.url },
    jobTitle: content.schema.jobTitle,
    worksFor: { '@type': 'Organization', name: content.schema.worksFor },
    address: {
      '@type': 'PostalAddress',
      addressLocality: content.schema.addressLocality,
      addressCountry: content.schema.addressCountry,
    },
    alumniOf: content.schema.alumniOf.map(function mapAlumnus(name) {
      return { '@type': 'CollegeOrUniversity', name }
    }),
    knowsAbout: content.interests,
    sameAs: content.social.map(function mapSocialLink(socialLink) {
      return socialLink.url
    }),
  }
}

function getBioSegmentKey(segment: BioSegment, index: number): string {
  if (segment.type === 'link') {
    return `link-${segment.label}-${index}`
  }

  return `text-${index}`
}

function ExternalLink({ href, children }: ExternalLinkProps): React.JSX.Element {
  return (
    <a href={href} className={linkClass} {...externalLinkAttributes}>
      {children}
    </a>
  )
}

function renderBioSegment(segment: BioSegment, index: number): React.JSX.Element {
  if (segment.type === 'link') {
    return (
      <ExternalLink key={getBioSegmentKey(segment, index)} href={segment.url}>
        {segment.label}
      </ExternalLink>
    )
  }

  return <Fragment key={getBioSegmentKey(segment, index)}>{segment.value}</Fragment>
}

export default function Home(): React.JSX.Element {
  const jsonLd = getPersonJsonLd()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="sr-only">
          {content.name} - {content.description}
        </h1>
        <section className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
            {content.bioParagraphs.map(function renderBioParagraph(paragraph, index): React.JSX.Element {
              return <p key={`paragraph-${index}`}>{paragraph.map(renderBioSegment)}</p>
            })}
          </div>
          <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-2">
            {content.social.map(function renderSocialLink({ label, url }): React.JSX.Element {
              return (
                <a key={label} href={url} className={navLinkClass} {...externalLinkAttributes}>
                  {label} &gt;
                </a>
              )
            })}
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
