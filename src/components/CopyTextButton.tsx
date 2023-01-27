import clsx from 'clsx'
import { useState } from 'react'
import { CopyIcon } from './CopyIcon'

interface CopyTextButtonProps {
  text: string
  disabled?: boolean
}

export const CopyTextButton = ({ text, disabled }: CopyTextButtonProps) => {
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
