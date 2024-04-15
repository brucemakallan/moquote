import { Skeleton } from "./skeleton"

export function VehicleLoadingSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-7 w-7" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
