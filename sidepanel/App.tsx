import { usePageData } from "~lib/cheerio/usePageData"
import { useScrapePage } from "~lib/cheerio/useScrapePageData"

import { Error } from "./Error"
import { GetQuoteButton } from "./GetQuoteButton"
import { ImageSection } from "./ImageSection"
import { VehicleInformation } from "./VehicleInformation"

export function App() {
  // TODO: get url dynamically
  const url = "https://www.beforward.jp/volkswagen/tiguan/br818823/id/7229101/"

  const pageDataQuery = usePageData(url)
  const scrapedDataQuery = useScrapePage(pageDataQuery.data)

  const ugxRate = 3800 // TODO: Get UGX rate

  const isLoading = pageDataQuery.isLoading || scrapedDataQuery.isLoading
  const error = pageDataQuery.error || scrapedDataQuery.error

  if (error) return <Error error={error} className="p-4" />

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 h-[100vh] justify-between">
      <div>
        <ImageSection />
        <VehicleInformation ugxRate={ugxRate} pageData={scrapedDataQuery.data} isLoading={isLoading} />
      </div>
      <div className="p-4">
        <GetQuoteButton />
      </div>
    </div>
  )
}
