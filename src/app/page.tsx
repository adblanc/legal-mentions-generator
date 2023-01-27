import { MentionsGeneratorForm } from '@/components/MentionsGeneratorForm'

export default function Home() {
  return (
    <div className="container mx-auto mt-16 p-4">
      <h1 className="mb-4 text-4xl font-semibold text-gray-700">
        Générateur de mentions légales gratuit
      </h1>
      <div className="mb-8 space-y-2 pl-2 text-gray-500">
        <p>
          Générez facilement et gratuitement les mentions légales pour votre
          site web.
        </p>
        <p>
          Votre site web doit être <b>conforme aux lois françaises</b> en
          matière de mentions légales.
        </p>
        <p>
          Compatible avec les principaux outils d&apos;hébergement de sites web
          tels que <b>Vercel</b>, <b>Netlify</b> et <b>OVH</b>.
        </p>
        <p>Nous vous garantissons une conformité légale en toute simplicité.</p>
      </div>
      <MentionsGeneratorForm />
    </div>
  )
}
