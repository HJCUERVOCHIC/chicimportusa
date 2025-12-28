interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <Skeleton className="h-4 w-3/4 mb-3" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-gray-50 p-5">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="pt-4 border-t border-border">
        <Skeleton className="h-4 w-1/3 mb-1" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}

export function BannerSkeleton() {
  return (
    <div className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
          <Skeleton className="h-8 w-2/3 max-w-md mb-3 bg-gray-300" />
          <Skeleton className="h-5 w-1/2 max-w-sm mb-6 bg-gray-300" />
          <Skeleton className="h-12 w-40 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-5">
        <Skeleton className="h-3 w-1/4 mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3 mb-3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}
