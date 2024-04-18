import posthog from "posthog-js"
import { useEffect, useMemo } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { CACHED_VEHICLE_DATA_KEY, CURRENT_URL_KEY } from "~helpers/constants"
import { convertToFloat } from "~helpers/numbers"
import { isValidVehicleUrl, usePageData } from "~lib/cheerio/usePageData"
import { useScrapePageData } from "~lib/cheerio/useScrapePageData"
import { useAPIExchangeRates } from "~lib/open-exchange-rates/useAPIExchangeRates"
import { useURATaxes } from "~lib/supabase/useURATaxes"

import { EmptyState } from "./EmptyState"
import { ErrorAlert } from "./ErrorAlert"
import { VehicleDetails, type VehicleData } from "./VehicleDetails"

export function App() {
  const [currentUrl] = useStorage(CURRENT_URL_KEY)
  const [vehicleCache, setVehicleCache] = useStorage<VehicleData | undefined>(
    CACHED_VEHICLE_DATA_KEY,
  )

  const isValidUrl = isValidVehicleUrl(currentUrl)

  const exchangeRatesQuery = useAPIExchangeRates(isValidUrl)
  const pageDataQuery = usePageData(isValidUrl, currentUrl)
  const scrapedDataQuery = useScrapePageData(isValidUrl, pageDataQuery.data)

  const { year, capacity, model } = scrapedDataQuery.data ?? {}
  const taxesQuery = useURATaxes(isValidUrl, {
    year,
    capacity,
    model,
  })

  const ugxRate = exchangeRatesQuery.data ?? 0
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

  const vehicleData = useMemo(() => {
    if (!scrapedDataQuery.data && !!vehicleCache?.heading) return vehicleCache

    const data = {
      ...scrapedDataQuery.data,
      ugxRate,
      tax,
      url: isValidUrl ? currentUrl : vehicleCache?.url,
    }

    setVehicleCache(data)
    return data
  }, [scrapedDataQuery.data, tax, ugxRate])

  useEffect(() => {
    if (isValidUrl && !!vehicleData?.heading) {
      posthog.capture("vehicle search", vehicleData)
    }
  }, [vehicleData, isValidUrl])

  if (!isValidUrl && !vehicleCache?.heading) return <EmptyState />

  if (error) return <ErrorAlert error={error} className="p-4" />

  return <VehicleDetails vehicleData={vehicleData} isLoading={isLoading} />
}
