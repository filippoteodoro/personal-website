import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-20">

        {/* Hero */}
        <section className="mb-20">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
            Filippo Teodoro
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Strategy Manager at Sky · Milan
          </p>
          <div className="text-sm text-gray-600 leading-relaxed mb-8 space-y-4">
            <p>
              I grew up in a small town in Lazio, Italy, where the internet was my window to the
              world. Before finishing high school I was already building websites and running small
              online businesses — not out of necessity, but out of a curiosity that no local library
              could satisfy. The web felt like proof that where you started didn&apos;t have to
              define where you ended up.
            </p>
            <p>
              That belief got its first real test when an Erasmus+ Excellence Scholarship sent me
              to Buenos Aires to start my degree. I could have played it safe; instead I took the
              furthest opportunity I could find. It was the best decision I&apos;ve ever made.
              Buenos Aires taught me that the world isn&apos;t a scary place — it&apos;s an
              endlessly generous one, full of people and ideas you&apos;d never encounter otherwise.
            </p>
            <p>
              What followed looks neat on paper: a degree from the University of Bologna, an
              exchange at Pompeu Fabra in Barcelona, a Grand École Master at ESSEC in Paris, and
              roles at Amazon, Bain and McKinsey before landing in the CEO/CTO office at Sky in
              Milan, where I advise on strategy, technology and decisions involving hundreds of
              millions of euros. Somewhere along the way I also became an Italian under-18 Muay
              Thai champion, published a thesis on blockchain, and backpacked through South America,
              China and Uganda.
            </p>
            <p>
              The entrepreneurial instinct that started with those teenage websites has never
              switched off. Today I deliberately choose work that leaves room for side projects,
              because I still think the most interesting things happen when you&apos;re building
              something from scratch. When I&apos;m not in a boardroom or buried in data,
              you&apos;ll find me tracking markets, reading about geopolitics, exploring a new city,
              hunting for a good playlist, or looking for the next flight somewhere I haven&apos;t
              been.
            </p>
          </div>
          <nav className="flex gap-6">
            <a
              href="https://github.com/filippoteodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/filippoteodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
            >
              LinkedIn ↗
            </a>
          </nav>
        </section>

        <hr className="border-gray-100 mb-20" />

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
