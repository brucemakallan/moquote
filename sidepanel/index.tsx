import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../style.css"

import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

const queryClient = new QueryClient()

function SidePanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-[100vh] justify-between">
        <div>
          <ImageSection />
          <VehicleInformation />
        </div>
        <div className="p-4">
          <GetQuoteButton />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default SidePanel
