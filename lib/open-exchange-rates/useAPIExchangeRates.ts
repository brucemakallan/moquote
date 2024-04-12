import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { differenceInHours, isValid, isYesterday } from "date-fns"

import { useDBExchangeRates } from "~lib/supabase/useDBExchangeRates"
import { useSetDBExchangeRates } from "~lib/supabase/useSetDBExchangeRates"

const shouldUpdate = (dateStr: string) => {
  const date = new Date(dateStr)

  if (!isValid(date)) return true

  const isStale = isYesterday(date) || differenceInHours(new Date(), date) >= 12

  return isStale
}

export function useAPIExchangeRates() {
  const APP_ID = process.env.PLASMO_PUBLIC_EXCHANGE_RATES_APP_ID
  const url = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`

  const { data: dbExchangeRate } = useDBExchangeRates({ currencyId: "UGX" })
  const { mutateAsync } = useSetDBExchangeRates()

  const getData = async (): Promise<number> => {
    const { value, updated_at } = dbExchangeRate

    if (!shouldUpdate(updated_at)) return value

    const pageResponse = await axios.get(url)
    const data = pageResponse.data
    const usdToUgx = data?.rates?.UGX

    if (!usdToUgx) throw new Error("Exchange Rate not found")

    await mutateAsync({ currencyId: "UGX", value: usdToUgx })

    return usdToUgx
  }

  const query = useQuery({
    queryKey: ["exchange-rates", url],
    queryFn: getData,
    enabled: !!APP_ID && !!dbExchangeRate,
  })

  return query
}
