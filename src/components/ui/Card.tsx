interface CardProps {
  children: React.ReactNode
  variant?: 'base' | 'soft'
  className?: string
}

export default function Card({ 
  children, 
  variant = 'base',
  className = '' 
}: CardProps) {
  const variantStyles = {
    base: 'bg-white',
    soft: 'bg-gray-50',
  }

  return (
    <div
      className={`
        rounded-xl
        border border-border
        ${variantStyles[variant]}
        p-5 md:p-6
        ${className}
      `}
    >
      {children}
    </div>
  )
}
