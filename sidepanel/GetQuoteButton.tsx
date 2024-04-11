import { Button } from "~components/ui/button"

interface Props {
  isLoading?: boolean
}

export function GetQuoteButton(props: Props) {
  const { isLoading } = props

  return (
    <Button disabled={isLoading} size="lg" className="w-full">
      Get a quote from an agent
    </Button>
  )
}
