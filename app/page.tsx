import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-20">

        {/* Hero */}
        <section className="mb-6">
          <div className="text-sm text-gray-600 leading-relaxed mb-6 space-y-4">
            <p>
              Hello! I&apos;m Filippo Teodoro. I currently live in Milan and work in Strategy at
              Sky, in the CEO/CTO offices. Before, I worked in consulting for McKinsey and Bain —
              mostly in private equity. Before, I worked for Amazon and a machine learning hedge
              fund in London.
            </p>
            <p>
              I grew up in a small town near Rome called Viterbo and I used the internet to make
              it feel much bigger. I studied in Buenos Aires, Barcelona and Paris, and have lived
              across Europe, South America and Asia.
            </p>
            <p>
              I build things on the side. Outside of work I love travel, sports, tech, finance,
              geopolitics, startups, music, fashion&hellip;
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
