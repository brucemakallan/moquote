import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "~components/ui/alert"

interface Props {
  title: string
  message: string
  className?: string
}

export function GenericAlert(props: Props) {
  const { title, message, className } = props

  return (
    <div className={className}>
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}
