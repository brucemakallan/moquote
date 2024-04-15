import { useState } from "react"

import { Button } from "~components/ui/button"
import { ResponsiveDrawer } from "~components/ui/ResponsiveDrawer"

import { QuotationForm } from "./QuotationForm"

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
      description="To get the full price (including agent fees, transportation fees, etc), ask for a qoutation from one of our agents by providing an email address and we will get back to you shortly."
      Trigger={
        <Button disabled={disabled} size="lg" className="w-full">
          Get a quote from an agent
        </Button>
      }
    >
      <QuotationForm />
    </ResponsiveDrawer>
  )
}
