import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-20">

        {/* Hero */}
        <section className="mb-6">
          <div className="text-sm text-gray-600 leading-relaxed mb-6 space-y-4">
            <p>
              Hello! I&apos;m Filippo Teodoro. I live in Milan and work in Strategy at Sky. On the
              side I love to build things online. I built my corporate skills at McKinsey and Bain
              — mostly in private equity — where I learned what high standards mean, but also that
              slides and excels only take you so far. Before that, I worked at Amazon and a machine
              learning hedge fund in London.
            </p>
            <p>
              I grew up in a small town near Rome called Viterbo and used the internet to make it
              feel much bigger — building businesses, learning about the world and playing a lot of
              video games. At the first opportunity I had, I flew as far from home as I could: I
              spent my first year of university in Buenos Aires, where I cemented my confidence and
              realised that if I was willing to give it a chance, the world was there to be
              discovered. Then I also studied in Barcelona and Paris, and have lived across Europe,
              South America and Asia.
            </p>
            <p>
              Outside of work I love travel, sports, tech, finance, geopolitics, startups, music,
              fashion&hellip;
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://www.linkedin.com/in/filippoteodoro/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">LinkedIn ↗</a>
            <a href="https://x.com/FilippoTeodoro" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">X ↗</a>
            <a href="https://www.instagram.com/filippoteodoro/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">Instagram ↗</a>
            <a href="https://www.facebook.com/teodorofilippo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">Facebook ↗</a>
            <a href="https://github.com/filippoteodoro" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">GitHub ↗</a>
          </nav>
        </section>

        <hr className="border-gray-100 mb-6" />

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Say hello</h2>
          <p className="text-sm text-gray-400 mb-8">
            Drop me a message — I read everything.
          </p>
          <ContactForm />
        </section>

        <footer className="mt-20 text-xs text-gray-300">
          © {new Date().getFullYear()} Filippo Teodoro
        </footer>

      </div>
    </main>
  )
}
