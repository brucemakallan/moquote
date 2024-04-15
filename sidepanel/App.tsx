import { convertToFloat } from "~helpers/numbers"
import { usePageData } from "~lib/cheerio/usePageData"
import { useScrapePage } from "~lib/cheerio/useScrapePageData"
import { useAPIExchangeRates } from "~lib/open-exchange-rates/useAPIExchangeRates"
import { useURATaxes } from "~lib/supabase/useURATaxes"

import { ErrorAlert } from "./ErrorAlert"
import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export function App() {
  // TODO: get url dynamically
  const url = "https://www.beforward.jp/subaru/impreza/bt012222/id/7411702/"

  const exchangeRatesQuery = useAPIExchangeRates()
  const ugxRate = exchangeRatesQuery.data ?? 0
  const pageDataQuery = usePageData(url)
  const scrapedDataQuery = useScrapePage(pageDataQuery.data)
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
        <GetQuoteButton isLoading={isLoading} />
      </div>
    </div>
  )
}
