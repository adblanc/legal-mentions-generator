import { MentionsGeneratorForm } from '@/components/MentionsGeneratorForm'

export default function Home() {
  return (
    <div className="container mx-auto mt-16">
      <h1 className="mb-16 text-4xl font-semibold text-gray-700">
        Générateur de mentions légales
      </h1>
      <MentionsGeneratorForm />
    </div>
  )
}
