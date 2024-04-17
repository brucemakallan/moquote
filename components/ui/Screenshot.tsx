import domtoimage from "dom-to-image"

import { useToast } from "./use-toast"

interface Props {
  id: string
  filename: string
  children: React.ReactNode
}

export function Screenshot(props: Props) {
  const { id, filename, children } = props
  const { toast } = useToast()

  const onClick = () => {
    domtoimage
      .toJpeg(document.getElementById(id), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a")
        link.download = `${filename}.jpeg`
        link.href = dataUrl
        link.click()

        toast({
          title: "Saved!",
          description: "Screenshot saved successfully.",
          duration: 3000,
        })
      })
  }

  return <div onClick={onClick}>{children}</div>
}
