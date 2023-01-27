import Link from 'next/link'

export const Footer = () => (
  <section className="flex h-20 w-full flex-col items-center justify-center space-y-1 text-center text-sm">
    <div>
      Développé par{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/adrien-blanc-904915196/"
        className="font-medium hover:underline"
      >
        Adrien Blanc
      </a>
    </div>
    <div>
      <Link href="/mentions-legales" className="hover:underline">
        Mentions légales
      </Link>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/adblanc/legal-mentions-generator"
        className="block hover:underline"
      >
        Github
      </a>
    </div>
  </section>
)
