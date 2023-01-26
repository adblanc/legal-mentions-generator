'use client'

import { ComponentProps, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  name: string
  label: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    const form = useFormContext()
    const state = form.getFieldState(props.name)

    return (
      <div className={className}>
        <label htmlFor={props.name} className="block text-sm font-medium">
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            {...props}
            id={props.name}
            ref={ref}
            className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {state.error && (
          <p className="p-2 text-sm text-red-500">{state.error.message}</p>
        )}
      </div>
    )
  }
)
