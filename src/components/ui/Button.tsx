import Link from 'next/link'
import { WHATSAPP_LINK, WHATSAPP_CTA_TEXT } from '@/types'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'large'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isWhatsApp?: boolean
  className?: string
  onClick?: () => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-accent text-white
    hover:bg-accent-hover
    focus:ring-accent
  `,
  secondary: `
    border border-border text-text
    hover:bg-gray-50
    focus:ring-border
  `,
  ghost: `
    text-text
    hover:bg-gray-50
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  default: 'px-5 py-3',
  large: 'px-6 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  isWhatsApp = false,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg
    font-semibold
    transition
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
  `

  const finalHref = isWhatsApp ? WHATSAPP_LINK : href
  const finalChildren = isWhatsApp && !children ? WHATSAPP_CTA_TEXT : children

  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim()

  if (finalHref) {
    const isExternal = finalHref.startsWith('http')
    
    if (isExternal) {
      return (
        <a
          href={finalHref}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {finalChildren}
        </a>
      )
    }

    return (
      <Link href={finalHref} className={combinedStyles}>
        {finalChildren}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {finalChildren}
    </button>
  )
}
