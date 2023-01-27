'use client'

import { z } from 'zod'
import { useZodForm } from '@/hooks/useZodForm'
import Form from './Form'
import { Input } from './Input'
import clsx from 'clsx'
import { UseFormReturn } from 'react-hook-form'
import { CopyIcon } from './CopyIcon'
import { useState } from 'react'

const schema = z.object({
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
})

export const MentionsGeneratorForm = () => {
  const form = useZodForm({
    schema,
  })

  const { isValid } = form.formState

  return (
    <section className="flex flex-row rounded-lg  p-16 shadow-2xl">
      <Form
        form={form}
        onSubmit={() => {}}
        className="h-full min-w-[190px] flex-[0.5]"
      >
        <div className="mb-4 grid grid-cols-2 gap-4">
          <Input label="Prénom" {...form.register('firstName')} />
          <Input label="Nom" {...form.register('lastName')} />
        </div>
        <div className="mt-4 space-y-4">
          <Input label="Adresse" {...form.register('address')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Ville" {...form.register('city')} />
            <Input label="Code postal" {...form.register('postalCode')} />
          </div>
        </div>
        <Input label="Email" {...form.register('email')} className="my-4" />
        <Input label="Numéro de téléphone" {...form.register('phoneNumber')} />
        <button
          onClick={() => {
            form.reset({
              address: '23 avenue de la Chapellerie',
              email: 'adrien.blancdarsonval@gmail.com',
              firstName: 'Adrien',
              lastName: 'Blanc',
              phoneNumber: '06 31 07 34 26',
              city: 'Sucy-En-Brie',
              postalCode: '94370',
            })
          }}
          type="button"
          className="absolute top-0 left-0 cursor-default opacity-0"
        >
          Fill form
        </button>
      </Form>
      <FormResult form={form} />
    </section>
  )
}

const FormResult = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof schema>>
}) => {
  const {
    firstName = 'PRENOM',
    lastName = 'NOM',
    address = 'ADRESSE',
    postalCode = 'CODE POSTAL',
    city = 'VILLE',
    phoneNumber = 'NUMERO DE TELEPHONE',
    email = 'EMAIL',
  } = form.watch()

  const lines = [
    `Ce site est édité par ${firstName} ${lastName}, résidant ${address}, ${postalCode} ${city}.`,
    `Téléphone : ${phoneNumber}.`,
    `Courrier électronique : ${email}.`,
    `Le directeur de la publication est ${firstName} ${lastName}.`,
    `Ce site est hébergé par la société Vercel Inc., située 340 S Lemon Ave
  #4133 Walnut, CA 91789, et joignable au (559) 288-7060`,
  ]

  return (
    <div className="h-full flex-1 pl-16">
      <div className="mb-8 space-y-4">
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <CopyTextButton
        text={lines.join('\n\n')}
        disabled={!form.formState.isValid}
      />
    </div>
  )
}

interface CopyTextButtonProps {
  text: string
  disabled?: boolean
}

const CopyTextButton = ({ text, disabled }: CopyTextButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setTimeout(() => setCopied(false), 2000)
    setCopied(true)
    navigator.clipboard.writeText(text)
  }

  return (
    <button
      disabled={disabled}
      onClick={handleCopy}
      className={clsx(
        'flex w-32 flex-row items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white shadow-md',
        {
          'bg-opacity-50': disabled,
        }
      )}
    >
      {!copied ? <CopyIcon /> : null}
      <div className="ml-2">{!copied ? 'Copier' : 'Copié !'}</div>
    </button>
  )
}
