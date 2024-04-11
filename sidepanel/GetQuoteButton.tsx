import { Button } from "~components/ui/button"

interface Props {}

export function GetQuoteButton(props: Props) {
  return (
    <Button size="lg" className="w-full">
      Get a quote from an agent
    </Button>
  )
}
