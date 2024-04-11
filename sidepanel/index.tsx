import "../style.css"

import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

function SidePanel() {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-[100vh] justify-between">
      <div>
        <ImageSection />
        <VehicleInformation />
      </div>
      <div className="p-4">
        <GetQuoteButton />
      </div>
    </div>
  )
}

export default SidePanel
