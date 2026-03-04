// ============================================================
// ChicImportUSA — Skeleton Loading
// Placeholders animados mientras cargan los datos.
// ============================================================

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-lg bg-gray-100',
        className
      )}
    />
  );
}

/** Skeleton de una tarjeta de producto */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-3 sm:p-4 space-y-2.5">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-24 mt-1" />
        <Skeleton className="h-9 w-full mt-2 rounded-lg" />
      </div>
    </div>
  );
}

/** Grid de skeletons de productos */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton de la barra de filtros */
export function FilterBarSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {/* Género tabs */}
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>
      {/* Categorías */}
      <div className="flex gap-2 overflow-hidden">
        <Skeleton className="h-8 w-28 rounded-full flex-shrink-0" />
        <Skeleton className="h-8 w-32 rounded-full flex-shrink-0" />
        <Skeleton className="h-8 w-24 rounded-full flex-shrink-0" />
        <Skeleton className="h-8 w-36 rounded-full flex-shrink-0" />
      </div>
    </div>
  );
}
