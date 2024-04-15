import { useStorage } from "@plasmohq/storage/hook"

import { CURRENT_URL_KEY } from "~helpers/constants"
import { convertToFloat } from "~helpers/numbers"
import { isValidVehicleUrl, usePageData } from "~lib/cheerio/usePageData"
import { useScrapePageData } from "~lib/cheerio/useScrapePageData"
import { useAPIExchangeRates } from "~lib/open-exchange-rates/useAPIExchangeRates"
import { useURATaxes } from "~lib/supabase/useURATaxes"

import { ErrorAlert } from "./ErrorAlert"
import { GenericAlert } from "./GenericAlert"
import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export function App() {
  const [currentUrl] = useStorage(CURRENT_URL_KEY)
  const isValidUrl = isValidVehicleUrl(currentUrl)

  const exchangeRatesQuery = useAPIExchangeRates(isValidUrl)
  const ugxRate = exchangeRatesQuery.data ?? 0
  const pageDataQuery = usePageData(isValidUrl, currentUrl)
  const scrapedDataQuery = useScrapePageData(isValidUrl, pageDataQuery.data)
  const { heading, year, capacity, model, imageUrl } =
    scrapedDataQuery.data ?? {}
  const taxesQuery = useURATaxes(isValidUrl, {
    year,
    capacity,
    model,
  })

  const tax = convertToFloat(taxesQuery.data?.ura_tax)

  const isLoading =
    pageDataQuery.isLoading ||
    scrapedDataQuery.isLoading ||
    taxesQuery.isLoading ||
    exchangeRatesQuery.isLoading

  const error =
    pageDataQuery.error ||
    scrapedDataQuery.error ||
    taxesQuery.error ||
    exchangeRatesQuery.error

  if (error) return <ErrorAlert error={error} className="p-4" />

  if (!isValidUrl) {
    return (
      <GenericAlert
        title="Oops!"
        message="Missing vehicle information. Please visit a valid vehicle page."
        className="p-4"
      />
    )
  }

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
