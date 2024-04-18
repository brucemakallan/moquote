import domtoimage from "dom-to-image"
import posthog from "posthog-js"

import { useToast } from "./use-toast"

interface Props {
  id: string
  filename: string
  vehicleUrl: string
  children: React.ReactNode
}

export function Screenshot(props: Props) {
  const { id, filename, vehicleUrl, children } = props
  const { toast } = useToast()

  const onClick = () => {
    domtoimage
      .toJpeg(document.getElementById(id), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a")
        link.download = `${filename}.jpeg`
        link.href = dataUrl
        link.click()

        posthog.capture("took a screenshot", { vehicleUrl })

        toast({
          title: "Saved!",
          description: "Screenshot saved successfully.",
          duration: 3000,
        })
      })
  }

  return <div onClick={onClick}>{children}</div>
}
