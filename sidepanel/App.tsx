import { useStorage } from "@plasmohq/storage/hook"

import { CURRENT_URL_KEY } from "~helpers/constants"
import { convertToFloat } from "~helpers/numbers"
import { usePageData } from "~lib/cheerio/usePageData"
import { useScrapePageData } from "~lib/cheerio/useScrapePageData"
import { useAPIExchangeRates } from "~lib/open-exchange-rates/useAPIExchangeRates"
import { useURATaxes } from "~lib/supabase/useURATaxes"

import { ErrorAlert } from "./ErrorAlert"
import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export function App() {
  const [currentUrl] = useStorage(CURRENT_URL_KEY)

  const exchangeRatesQuery = useAPIExchangeRates()
  const ugxRate = exchangeRatesQuery.data ?? 0
  const pageDataQuery = usePageData(currentUrl)
  const scrapedDataQuery = useScrapePageData(pageDataQuery.data)
  const { heading, year, capacity, model, imageUrl } =
    scrapedDataQuery.data ?? {}
  const taxesQuery = useURATaxes({
    year,
    capacity,
    model,
  })

  const tax = convertToFloat(taxesQuery.data?.ura_tax)

  const isLoading =
    pageDataQuery.isLoading ||
    scrapedDataQuery.isLoading ||
    taxesQuery.isLoading

  const error =
    pageDataQuery.error || scrapedDataQuery.error || taxesQuery.error

  if (error) return <ErrorAlert error={error} className="p-4" />

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-screen justify-between">
      <div className="flex flex-col gap-4">
        <ImageSection src={imageUrl} />
        {!!heading && <h4 className="px-4">{heading}</h4>}
        <VehicleInformation
          ugxRate={ugxRate}
          pageData={scrapedDataQuery.data}
          tax={tax}
          isLoading={isLoading}
        />
      </div>
      <div className="px-4 pb-4">
        <GetQuoteButton disabled={isLoading || !!error || !tax} />
      </div>
    </div>
  )
}
