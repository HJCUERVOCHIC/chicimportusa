interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        bg-gray-100
        px-3 py-1
        text-xs font-medium
        text-muted
        ${className}
      `}
    >
      {children}
    </span>
  )
}
