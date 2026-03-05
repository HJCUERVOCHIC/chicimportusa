'use client'

import Link from 'next/link'
import { WHATSAPP_LINK } from '@/types'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  isWhatsApp?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  external?: boolean
}

export default function Button({
  children,
  href,
  isWhatsApp = false,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  external = false,
}: ButtonProps) {
  // Determinar href final
  const finalHref = isWhatsApp ? WHATSAPP_LINK : href

  // Clases base
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  // Tamaños
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  // Estilos inline para usar variables CSS
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--accent)',
          color: 'white',
        }
      case 'secondary':
        return {
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--accent)',
          border: '2px solid var(--accent)',
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
        }
      default:
        return {}
    }
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  // Handlers para hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const target = e.currentTarget
    
    switch (variant) {
      case 'primary':
        target.style.backgroundColor = 'var(--accent-hover)'
        break
      case 'secondary':
        target.style.backgroundColor = 'var(--surface-soft)'
        break
      case 'outline':
        target.style.backgroundColor = 'var(--accent)'
        target.style.color = 'white'
        break
      case 'ghost':
        target.style.backgroundColor = 'var(--surface)'
        break
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const target = e.currentTarget
    const styles = getVariantStyles()
    
    target.style.backgroundColor = styles.backgroundColor || 'transparent'
    target.style.color = styles.color || ''
  }

  // Si es link externo o WhatsApp
  if (finalHref && (external || isWhatsApp)) {
    return (
      <a
        href={finalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={getVariantStyles() as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    )
  }

  // Si es link interno
  if (finalHref) {
    return (
      <Link
        href={finalHref}
        className={classes}
        style={getVariantStyles() as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    )
  }

  // Si es button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={getVariantStyles() as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
