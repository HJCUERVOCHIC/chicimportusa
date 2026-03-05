// ============================================================
// ChicImportUSA — Skeleton Loading · Nieve Activa
// ============================================================

import { cn } from '@/lib/utils';

interface SkeletonProps { className?: string; }

export function SkeletonStyles() {
  return (
    <style>{`
      @keyframes skeleton-sweep {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  );
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden bg-gray-100', className)}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          animation: 'skeleton-sweep 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 sm:p-4 space-y-2.5">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-5 w-24 rounded mt-1" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded-full flex-shrink-0" />
        <Skeleton className="h-8 w-20 rounded-full flex-shrink-0" />
        <Skeleton className="h-8 w-16 rounded-full flex-shrink-0" />
      </div>
      <div className="flex gap-2 overflow-hidden">
        <Skeleton className="h-7 w-24 rounded-full flex-shrink-0" />
        <Skeleton className="h-7 w-28 rounded-full flex-shrink-0" />
        <Skeleton className="h-7 w-20 rounded-full flex-shrink-0" />
      </div>
    </div>
  );
}
