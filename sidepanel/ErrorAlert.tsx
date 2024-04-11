import { get } from "lodash"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "~components/ui/alert"

interface Props {
  error: unknown
  className?: string
}

export function ErrorAlert(props: Props) {
  const { error, className } = props

  return (
    <div className={className}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {get(error, "message", "Something went wrong")}
        </AlertDescription>
      </Alert>
    </div>
  )
}
