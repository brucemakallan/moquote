import { Skeleton } from "~components/ui/skeleton"
import type { ScrapePageData } from "~lib/cheerio/useScrapePageData"

import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export type VehicleData = ScrapePageData & {
  ugxRate: number
  tax: number
}

interface Props {
  vehicleData: VehicleData
  isLoading?: boolean
}

export function VehicleDetails(props: Props) {
  const { vehicleData, isLoading } = props
  const { heading, imageUrl, ugxRate, tax } = vehicleData ?? {}

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-screen justify-between">
      <div className="flex flex-col gap-4">
        <ImageSection src={imageUrl} isLoading={isLoading} />

        {!!isLoading ? (
          <div className="px-4">
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          !!heading && <h4 className="px-4">{heading}</h4>
        )}

        <VehicleInformation
          ugxRate={ugxRate}
          pageData={vehicleData}
          tax={tax}
          isLoading={isLoading}
        />
      </div>
      <div className="px-4 pb-4">
        <GetQuoteButton disabled={isLoading || !tax} />
      </div>
    </div>
  )
}
