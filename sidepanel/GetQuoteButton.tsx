import { useState } from "react"

import { Button } from "~components/ui/button"
import { ResponsiveDrawer } from "~components/ui/ResponsiveDrawer"

interface Props {
  disabled?: boolean
}

export function GetQuoteButton(props: Props) {
  const { disabled } = props
  const [open, setOpen] = useState(false)

  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title="Get a quote from an agent"
      description="Get a quote from an agent"
      Trigger={
        <Button disabled={disabled} size="lg" className="w-full">
          Get a quote from an agent
        </Button>
      }
    >
      <p>Get a quote from an agent</p>
    </ResponsiveDrawer>
  )
}
