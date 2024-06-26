import { useMemo } from "react"

import { Skeleton } from "~components/ui/skeleton"
import { convertToFloat } from "~helpers/numbers"
import type { ScrapePageData } from "~lib/cheerio/useScrapePageData"

import { ImageSection } from "./ImageSection"
import { GetQuoteButton } from "./Quotation/GetQuoteButton"
import { VehicleInformation } from "./VehicleInformation"

export type VehicleData = ScrapePageData & {
  ugxRate: number
  tax: number
  url: string
}

interface Props {
  vehicleData: VehicleData
  isLoading?: boolean
}

export function VehicleDetails(props: Props) {
  const { vehicleData, isLoading } = props
  const {
    heading,
    imageUrl,
    ugxRate,
    tax,
    totalPrice,
    capacity,
    year,
    model,
    url,
  } = vehicleData ?? {}

  const quotationRequest = useMemo(
    () => ({
      url,
      heading,
      year,
      capacity,
      model,
      imageUrl,
      ugxRate,
      tax,
      email: "",
      price: convertToFloat(totalPrice),
    }),
    [vehicleData, url],
  )

  return (
    <div
      id="vehicle-section"
      className="max-w-[600px] mx-auto flex flex-col gap-4 h-screen justify-between bg-white"
    >
      <div className="flex flex-col gap-4">
        <ImageSection src={imageUrl} isLoading={isLoading} vehicleUrl={url} />

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
        <GetQuoteButton
          quotationRequest={quotationRequest}
          disabled={isLoading || !tax}
        />
      </div>
    </div>
  )
}
