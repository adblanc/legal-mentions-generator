import { ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'select'> {
  name: string
  label: string
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={props.name} className="block text-sm font-medium">
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <select
            {...props}
            id={props.name}
            ref={ref}
            className="block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    )
  }
)

export default Select
