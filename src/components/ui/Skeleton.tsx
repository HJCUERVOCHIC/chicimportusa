// ============================================================
// ChicImportUSA — Skeleton Loading · Etapa 3 Dark Theme
// ============================================================

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

// Shimmer keyframe — inyectado una sola vez en el DOM
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

// Bloque base con shimmer oscuro
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative overflow-hidden bg-[#1a1a1a]', className)}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          animation: 'skeleton-sweep 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// Skeleton de tarjeta de producto
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#141414] border-b-2 border-transparent overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20 rounded-sm" />
        <Skeleton className="h-5 w-full rounded-sm" />
        <Skeleton className="h-5 w-3/4 rounded-sm" />
        <Skeleton className="h-6 w-24 rounded-sm" />
        <Skeleton className="h-10 w-full rounded-sm mt-1" />
      </div>
    </div>
  );
}

// Grid de skeletons
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-px"
      style={{
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        backgroundColor: 'rgba(255,255,255,0.06)',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Skeleton barra de filtros
export function FilterBarSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-10 w-full rounded-sm" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded-sm flex-shrink-0" />
        <Skeleton className="h-8 w-20 rounded-sm flex-shrink-0" />
        <Skeleton className="h-8 w-16 rounded-sm flex-shrink-0" />
      </div>
      <div className="flex gap-2 overflow-hidden">
        <Skeleton className="h-7 w-24 rounded-sm flex-shrink-0" />
        <Skeleton className="h-7 w-28 rounded-sm flex-shrink-0" />
        <Skeleton className="h-7 w-20 rounded-sm flex-shrink-0" />
        <Skeleton className="h-7 w-32 rounded-sm flex-shrink-0" />
      </div>
    </div>
  );
}
