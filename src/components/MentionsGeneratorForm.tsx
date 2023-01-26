'use client'

import { z } from 'zod'
import { useZodForm } from '@/hooks/useZodForm'
import Form from './Form'
import { Input } from './Input'
import clsx from 'clsx'

const schema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
})

export const MentionsGeneratorForm = () => {
  const form = useZodForm({
    schema,
  })

  const { isValid } = form.formState

  return (
    <Form
      form={form}
      onSubmit={(data) => {}}
      className="w-1/2 rounded-lg border border-gray-300 p-16"
    >
      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input label="Nom" {...form.register('lastName')} />
        <Input label="Prénom" {...form.register('firstName')} />
      </div>
      <Input label="Email" {...form.register('email')} className="mb-4" />
      <Input label="Numéro de téléphone" {...form.register('phoneNumber')} />
      <div className="mt-4 space-y-4">
        <Input label="Adresse" {...form.register('address')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Ville" {...form.register('city')} />
          <Input label="Code postal" {...form.register('postalCode')} />
        </div>
      </div>
      <button
        disabled={!isValid}
        className={clsx('mt-8 rounded-md px-4  py-2 text-white', {
          'bg-indigo-500': isValid,
          'bg-indigo-400': !isValid,
        })}
        type="submit"
      >
        Valider
      </button>
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
  )
}
