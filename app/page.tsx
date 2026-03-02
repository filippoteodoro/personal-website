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
            {/* TODO: your role / one-liner */}
            Designer &amp; Developer · Milan
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            {/* TODO: replace with your actual bio (2–3 sentences) */}
            A few sentences about who you are, what you do, and what you care about.
            Keep it short and honest.
          </p>
          <nav className="flex gap-6">
            <a
              href="https://github.com/filippoteodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
            >
              GitHub ↗
            </a>
            {/* TODO: add more links — LinkedIn, X, etc. */}
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
