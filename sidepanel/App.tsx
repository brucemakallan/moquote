import { convertToFloat } from "~helpers/numbers"
import { usePageData } from "~lib/cheerio/usePageData"
import { useScrapePage } from "~lib/cheerio/useScrapePageData"
import { useURATaxes } from "~lib/supabase/useURATaxes"

import { ErrorAlert } from "./ErrorAlert"
import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export function App() {
  // TODO: get url dynamically
  const url = "https://www.beforward.jp/volkswagen/tiguan/br908510/id/7324016/"

  const pageDataQuery = usePageData(url)
  const scrapedDataQuery = useScrapePage(pageDataQuery.data)
  const { year, capacity, modal, imageUrl } = scrapedDataQuery.data ?? {}
  const taxesQuery = useURATaxes({
    year,
    capacity,
    modal,
  })

  const ugxRate = 3800 // TODO: Get UGX rate
  const tax = convertToFloat(taxesQuery.data?.ura_tax)

  const isLoading =
    pageDataQuery.isLoading ||
    scrapedDataQuery.isLoading ||
    taxesQuery.isLoading

  const error =
    pageDataQuery.error || scrapedDataQuery.error || taxesQuery.error

  if (error) return <ErrorAlert error={error} className="p-4" />

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-[100vh] justify-between">
      <div>
        {!!imageUrl && <ImageSection src={imageUrl} />}
        <VehicleInformation
          ugxRate={ugxRate}
          pageData={scrapedDataQuery.data}
          tax={tax}
          isLoading={isLoading}
        />
      </div>
      <div className="p-4">
        <GetQuoteButton />
      </div>
    </div>
  )
}
