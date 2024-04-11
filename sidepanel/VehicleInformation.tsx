import { BsCoin } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineNumbers } from "react-icons/md"
import { PiEngine } from "react-icons/pi"
import { RxCalendar } from "react-icons/rx"

import { InfoCard } from "~components/ui/InfoCard"
import { convertToFloat } from "~helpers/numbers"
import { usePageData } from "~lib/cheerio/usePageData"
import { useScrapePage } from "~lib/cheerio/useScrapePageData"

import { Error } from "./Error"

export function VehicleInformation() {
  // TODO: get url dynamically
  const url = "https://www.beforward.jp/volkswagen/tiguan/br818823/id/7229101/"

  const pageDataQuery = usePageData(url)
  const scrapedDataQuery = useScrapePage(pageDataQuery.data)

  const { totalPrice, year, capacity, modal } = scrapedDataQuery.data || {}
  const totalPriceFloat = convertToFloat(totalPrice)

  const ugxRate = 3800 // TODO: Get UGX rate

  const isLoading = pageDataQuery.isLoading || scrapedDataQuery.isLoading
  const error = pageDataQuery.error || scrapedDataQuery.error

  if (error) return <Error error={error} className="p-4" />

  return (
    <div className="flex gap-4 flex-wrap p-4">
      {!!year && (
        <InfoCard Icon={RxCalendar} heading="Year / Month" value={year} className="grow" isLoading={isLoading} />
      )}
      {!!capacity && (
        <InfoCard Icon={PiEngine} heading="Size" value={capacity} className="grow" isLoading={isLoading} />
      )}
      {!!modal && (
        <InfoCard Icon={MdOutlineNumbers} heading="Modal code" value={modal} className="grow" isLoading={isLoading} />
      )}
      {!!totalPrice && (
        <InfoCard
          Icon={GiMoneyStack}
          heading="Price"
          value={`USD ${totalPriceFloat.toLocaleString()}`}
          hint={`(UGX ${(totalPriceFloat * ugxRate).toLocaleString()})`}
          className="w-full"
          isLoading={isLoading}
        />
      )}
      <InfoCard
        Icon={BsCoin}
        variant="accent"
        heading="URA TAXES"
        value="USD x,xxx"
        hint="(UGX x,xxx,xxx)"
        className="w-full"
        isLoading={isLoading}
      />
    </div>
  )
}
