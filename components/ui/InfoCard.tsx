import { RxCalendar } from "react-icons/rx"

import { cn } from "~lib/utils"

interface Props {
  Icon: typeof RxCalendar
  heading: string
  value: string
  hint?: string
  className?: string
  variant?: "primary" | "accent"
}

export function InfoCard(props: Props) {
  const { Icon, heading, value, hint, className, variant = "primary" } = props

  const isPrimary = variant === "primary"

  return (
    <div
      className={cn(
        "rounded-xl px-4 py-2 flex gap-3 items-center",
        isPrimary ? "bg-primary-light-4" : "bg-gradient-to-r from-blue-200 to-cyan-200",
        className,
      )}
    >
      <Icon className={cn("w-7 h-7", isPrimary ? "text-primary-dark-3" : "text-secondary-dark-5")} />
      <div className="flex flex-col">
        <span className={cn("uppercase text-xs", isPrimary ? "text-gray-500" : "text-gray-700")}>{heading}</span>
        <span className={cn("text-lg", isPrimary ? "text-gray-600" : "text-primary-dark-5")}>{value}</span>
        <span className={cn("text-sm", isPrimary ? "text-gray-600" : "text-primary-dark-5")}>{hint}</span>
      </div>
    </div>
  )
}
