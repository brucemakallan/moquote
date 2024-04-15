import { Button } from "~components/ui/button"

interface Props {
  disabled?: boolean
}

export function GetQuoteButton(props: Props) {
  const { disabled } = props

  return (
    <Button disabled={disabled} size="lg" className="w-full">
      Get a quote from an agent
    </Button>
  )
}
