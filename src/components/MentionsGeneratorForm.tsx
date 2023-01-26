'use client'

import { z } from 'zod'
import { useZodForm } from '@/hooks/useZodForm'
import Form from './Form'
import { Input } from './Input'
import clsx from 'clsx'
import { UseFormReturn } from 'react-hook-form'

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
    <section className="flex flex-row rounded-lg border border-gray-300 p-16">
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
  return (
    <div className="h-full flex-1 space-y-4 pl-16">
      <div>
        Ce site est édité par {firstName} {lastName}, résidant {address},{' '}
        {postalCode} {city}.
      </div>
      <div>Téléphone : {phoneNumber}.</div>
      <div>Courrier électronique : {email}.</div>
      <div>
        Le directeur de la publication est {firstName} {lastName}.
      </div>
      <div>
        Ce site est hébergé par la société Vercel Inc., située 340 S Lemon Ave
        #4133 Walnut, CA 91789, et joignable au (559) 288-7060
      </div>
    </div>
  )
}
