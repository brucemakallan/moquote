import { useMemo } from "react"
import { BsCoin } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineNumbers } from "react-icons/md"
import { PiEngine } from "react-icons/pi"
import { RxCalendar } from "react-icons/rx"

import { VehicleInfoCard } from "~components/ui/VehicleInfoCard"
import { VehicleLoadingSkeleton } from "~components/ui/VehicleLoadingSkeleton"
import { convertToFloat } from "~helpers/numbers"
import type { ScrapePageData } from "~lib/cheerio/useScrapePageData"

import { ErrorAlert } from "./ErrorAlert"

type Props = {
  pageData: ScrapePageData
  ugxRate: number
  tax: number
  isLoading?: boolean
}

export function VehicleInformation(props: Props) {
  const { ugxRate, isLoading, pageData, tax } = props
  const { year, capacity, model, totalPrice } = pageData ?? {}

  const totalPriceFloat = useMemo(
    () => convertToFloat(totalPrice),
    [totalPrice],
  )

  if (isLoading) return <VehicleLoadingSkeleton />

  return (
    <div className="flex gap-4 flex-wrap px-4">
      {!!year && (
        <VehicleInfoCard
          Icon={RxCalendar}
          heading1="Year / Month"
          value1={year}
          className="grow"
        />
      )}
      {!!capacity && (
        <VehicleInfoCard
          Icon={PiEngine}
          heading1="Size"
          value1={capacity}
          className="grow"
        />
      )}
      {!!model && (
        <VehicleInfoCard
          Icon={MdOutlineNumbers}
          heading1="Model code"
          value1={model}
          className="grow"
        />
      )}
      {!!totalPriceFloat && !!ugxRate && (
        <VehicleInfoCard
          Icon={GiMoneyStack}
          heading1="Price"
          value1={`UGX ${Math.round(totalPriceFloat * ugxRate).toLocaleString()}`}
          hint1={`(USD ${totalPriceFloat.toLocaleString()})`}
          className="w-full"
          tooltip={`USD 1 = UGX ${ugxRate.toLocaleString()}`}
        />
      )}
      {!!tax && !!ugxRate && totalPriceFloat ? (
        <VehicleInfoCard
          Icon={BsCoin}
          variant="accent"
          heading1="URA TAXES"
          value1={`UGX ${Math.round(tax * ugxRate).toLocaleString()}`}
          hint1={`(USD ${tax.toLocaleString()})`}
          heading2="TOTAL"
          value2={`UGX ${Math.round(tax * ugxRate + totalPriceFloat * ugxRate).toLocaleString()}`}
          hint2={`(USD ${(totalPriceFloat + tax).toLocaleString()})`}
          className="w-full"
          tooltip={`USD 1 = UGX ${ugxRate.toLocaleString()}`}
        />
      ) : (
        <ErrorAlert
          error={
            new Error(
              "Could not find tax information for this vehicle. It might be an old and/or unlisted model",
            )
          }
        />
      )}
    </div>
  )
}
