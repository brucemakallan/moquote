import { AiOutlineInfoCircle } from "react-icons/ai"
import { RxCalendar } from "react-icons/rx"

import { Popover, PopoverContent, PopoverTrigger } from "~components/ui/popover"
import { cn } from "~lib/utils"

import { Skeleton } from "./skeleton"

interface Props {
  Icon: typeof RxCalendar
  heading1: string
  value1: string
  hint1?: string

  heading2?: string
  value2?: string
  hint2?: string

  className?: string
  variant?: "primary" | "accent"
  isLoading?: boolean
  tooltip?: string
}

export function VehicleInfoCard(props: Props) {
  const {
    Icon,
    heading1,
    value1,
    hint1,
    heading2,
    value2,
    hint2,
    className,
    isLoading,
    tooltip,
    variant = "primary",
  } = props

  const isPrimary = variant === "primary"

  if (isLoading) return <InfoCardSkeleton />

  return (
    <div
      className={cn(
        "rounded-xl px-4 py-2 flex gap-3 items-center",
        isPrimary
          ? "bg-primary-light-4"
          : "bg-gradient-to-r from-blue-200 to-cyan-200",
        className,
      )}
    >
      <Icon
        className={cn(
          "w-7 h-7",
          isPrimary ? "text-primary-dark-3" : "text-secondary-dark-5",
        )}
      />

      <div className="flex flex-col grow">
        {!!heading1 && (
          <span
            className={cn(
              "uppercase text-xs",
              isPrimary ? "text-gray-500" : "text-gray-700",
            )}
          >
            {heading1}
          </span>
        )}
        {!!value1 && (
          <span
            className={cn(
              "text-lg",
              isPrimary ? "text-gray-600" : "text-primary-dark-5",
            )}
          >
            {value1}
          </span>
        )}
        {!!hint1 && (
          <span
            className={cn(
              "text-sm",
              isPrimary ? "text-gray-600" : "text-primary-dark-5",
            )}
          >
            {hint1}
          </span>
        )}
        {!!heading2 && (
          <span
            className={cn(
              "uppercase text-xs  mt-4",
              isPrimary ? "text-gray-500" : "text-gray-700",
            )}
          >
            {heading2}
          </span>
        )}
        {!!value2 && (
          <span
            className={cn(
              "text-lg",
              isPrimary ? "text-gray-600" : "text-primary-dark-5",
            )}
          >
            {value2}
          </span>
        )}
        {!!hint2 && (
          <span
            className={cn(
              "text-sm",
              isPrimary ? "text-gray-600" : "text-primary-dark-5",
            )}
          >
            {hint2}
          </span>
        )}
      </div>

      {tooltip && <InfoPopover text={tooltip} />}
    </div>
  )
}

function InfoCardSkeleton() {
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

function InfoPopover({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <AiOutlineInfoCircle className="w-5 h-5 text-gray-500" />
      </PopoverTrigger>
      <PopoverContent className="w-auto">{text}</PopoverContent>
    </Popover>
  )
}
