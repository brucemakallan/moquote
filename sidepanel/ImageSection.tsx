import { RiScreenshot2Line } from "react-icons/ri"

import { Button } from "~components/ui/button"
import { Image } from "~components/ui/Image"
import { Screenshot } from "~components/ui/Screenshot"

interface Props {
  src: string
  isLoading?: boolean
  vehicleUrl: string
}

export function ImageSection(props: Props) {
  const { src, isLoading, vehicleUrl } = props
  const date = new Date().toISOString()
  const filename = `vehicle-screenshot-${date}`

  return (
    <div className="grid w-full h-[220px]">
      <div className="row-start-1 col-start-1 w-full min-h-[220px] flex items-center justify-center">
        <Image
          src={src}
          isLoading={isLoading}
          alt="Vehicle"
          className="w-full h-[220px] object-cover rounded-b-3xl"
        />
      </div>
      <div className="row-start-1 col-start-1 flex justify-end w-full">
        <Screenshot
          id="vehicle-section"
          filename={filename}
          vehicleUrl={vehicleUrl}
        >
          <div className="w-10 h-10 bg-gray-800/85 rounded-bl-3xl p-2.5">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-full hover:bg-transparent"
              title="Take a screenshot of the vehicle details"
            >
              <RiScreenshot2Line className="w-10 h-10 text-secondary-base" />
            </Button>
          </div>
        </Screenshot>
      </div>
    </div>
  )
}
