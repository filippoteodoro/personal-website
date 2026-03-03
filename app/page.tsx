import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-6 py-20">

        {/* Hero */}
        <section className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
            <p>
              Hello! I&apos;m Filippo Teodoro. I live in Milan and work in Strategy at{' '}
              <a href="https://www.sky.it/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Sky</a>.
              {' '}On the side I love to build things online. I developed my corporate skills at{' '}
              <a href="https://www.mckinsey.com/it/our-work/private-equity" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">McKinsey</a>
              {' '}and{' '}
              <a href="https://www.bain.com/industry-expertise/private-equity/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Bain</a>,
              mostly in private equity. There I learned what high standards mean, but also that
              slides and excels would only take me so far. Before that, I worked at{' '}
              <a href="https://www.amazon.jobs/en/location/luxembourg-city-luxembourg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Amazon</a>
              {' '}and a machine learning{' '}
              <a href="https://www.euklid.uk.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">hedge fund</a>
              {' '}in London.
            </p>
            <p>
              I grew up in a small town near Rome called Viterbo and used the internet to make it
              feel much bigger by building businesses, learning about the world and playing video games. At the first opportunity I had, I flew as far from home as I could: I
              spent my first year of university in Buenos Aires, where I consolidated my confidence and
              realised that if I was willing to give it a chance, the world was there to teach me
              something I didn&apos;t know about myself. Then I also studied in Barcelona and Paris,
              and have lived across Europe, South America and Asia.
            </p>
            <p>
              Outside of work I love cultures, nature, sports, health, tech, finance, design, geopolitics, startups,
              music, fashion&hellip;
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://www.linkedin.com/in/filippoteodoro/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">LinkedIn ↗</a>
            <a href="https://x.com/FilippoTeodoro" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">X ↗</a>
            <a href="https://www.instagram.com/filippoteodoro/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Instagram ↗</a>
            <a href="https://www.facebook.com/teodorofilippo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Facebook ↗</a>
            <a href="https://github.com/filippoteodoro" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">GitHub ↗</a>
          </nav>
        </section>

        <hr className="border-gray-100 dark:border-gray-800 mb-6" />

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Say hello</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
            Drop me a message — I read everything.
          </p>
          <ContactForm />
        </section>

        <footer className="mt-20 text-xs text-gray-300 dark:text-gray-600">
          © {new Date().getFullYear()} Filippo Teodoro
        </footer>

      </div>
    </main>
  )
}
