import { useMemo } from "react"
import { BsCoin } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineNumbers } from "react-icons/md"
import { PiEngine } from "react-icons/pi"
import { RxCalendar } from "react-icons/rx"

import { InfoCard } from "~components/ui/InfoCard"
import { convertToFloat } from "~helpers/numbers"
import type { ScrapePageData } from "~lib/cheerio/useScrapePageData"

type Props = {
  pageData: ScrapePageData
  ugxRate: number
  isLoading?: boolean
}

export function VehicleInformation(props: Props) {
  const { ugxRate, isLoading, pageData } = props
  const { year, capacity, modal, totalPrice } = pageData ?? {}

  const totalPriceFloat = useMemo(() => convertToFloat(totalPrice), [totalPrice])

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
      {!!totalPriceFloat && !!ugxRate && (
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
