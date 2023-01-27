'use client'

import { z } from 'zod'
import { useZodForm } from '@/hooks/useZodForm'
import Form from './Form'
import { Input } from './Input'
import { UseFormReturn } from 'react-hook-form'
import Select from './Select'
import { CopyTextButton } from '@/components/CopyTextButton'

const schema = z.object({
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  host: z.union([
    z.literal('Vercel'),
    z.literal('Netlify'),
    z.literal('Webflow'),
  ]),
})

const PLACEHOLDERS = {
  address: '23 avenue de la Chapellerie',
  city: 'Sucy-En-Brie',
  email: 'adrien.blancdarsonval@gmail.com',
  firstName: 'Adrien',
  host: 'Vercel',
  lastName: 'Blanc',
  phoneNumber: '06 31 07 34 26',
  postalCode: '94370',
} as const satisfies Record<keyof z.infer<typeof schema>, string>

export const MentionsGeneratorForm = () => {
  const form = useZodForm({
    schema,
    defaultValues: {
      host: 'Vercel',
    },
  })

  return (
    <section className="flex flex-row rounded-lg  p-16 shadow-2xl">
      <Form
        form={form}
        onSubmit={() => {}}
        className="h-full min-w-[190px] flex-[0.5]"
      >
        <div className="mb-4 grid grid-cols-2 gap-4">
          <Input
            label="Prénom"
            placeholder={PLACEHOLDERS['firstName']}
            {...form.register('firstName')}
          />
          <Input
            label="Nom"
            placeholder={PLACEHOLDERS['lastName']}
            {...form.register('lastName')}
          />
        </div>
        <div className="mt-4 space-y-4">
          <Input
            label="Adresse"
            placeholder={PLACEHOLDERS['address']}
            {...form.register('address')}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ville"
              placeholder={PLACEHOLDERS['city']}
              {...form.register('city')}
            />
            <Input
              label="Code postal"
              placeholder={PLACEHOLDERS['postalCode']}
              {...form.register('postalCode')}
            />
          </div>
        </div>
        <Input
          label="Email"
          placeholder={PLACEHOLDERS['email']}
          {...form.register('email')}
          className="my-4"
        />
        <Input
          label="Numéro de téléphone"
          placeholder={PLACEHOLDERS['phoneNumber']}
          {...form.register('phoneNumber')}
        />
        <Select label="Hébergeur" {...form.register('host')} className="mt-4">
          {schema.shape.host.options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.value}
            </option>
          ))}
        </Select>
        <button
          onClick={() => {
            form.reset(PLACEHOLDERS)
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

const HOSTS_LINES: Record<z.infer<typeof schema>['host'], string> = {
  Vercel: `Ce site est hébergé par la société Vercel Inc., située 340 S Lemon Ave #4133 Walnut, CA 91789, et joignable au (559) 288-7060.`,
  Netlify: `Ce site est hébergé par la société Netlify, située 610 22nd Street, Suite 315, CA 94107 San Francisco et joignable au +1 844-899-7312.`,
  Webflow: `Ce site est hébergé par la société Webflow, située au 398 11th Street, 2nd Floor CA 94103 San Francisco , joignable à l'adresse mail suivante : contact@webflow.com.`,
}

const FormResult = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof schema>>
}) => {
  const {
    firstName,
    lastName,
    address,
    postalCode,
    city,
    phoneNumber,
    email,
    host,
  } = form.watch()

  const lines = [
    `Ce site est édité par ${firstName || PLACEHOLDERS['firstName']} ${
      lastName || PLACEHOLDERS['lastName']
    }, résidant ${address || PLACEHOLDERS['address']}, ${
      postalCode || PLACEHOLDERS['postalCode']
    } ${city || PLACEHOLDERS['city']}.`,
    `Téléphone : ${phoneNumber || PLACEHOLDERS['phoneNumber']}.`,
    `Courrier électronique : ${email || PLACEHOLDERS['email']}.`,
    `Le directeur de la publication est ${
      firstName || PLACEHOLDERS['firstName']
    } ${lastName || PLACEHOLDERS['lastName']}.`,
    HOSTS_LINES[host],
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
