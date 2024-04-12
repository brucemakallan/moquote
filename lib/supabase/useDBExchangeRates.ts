import { useQuery } from "@tanstack/react-query"

import { supabase } from "~core/supabase"
import type { Currency, tables } from "~types/database"

type Args = {
  currencyId: Currency
}

export function useDBExchangeRates(args: Args) {
  const { currencyId } = args

  const getData = async () => {
    const { data, error } = await supabase
      .from("exchange_rates")
      .select("*")
      .eq("id", currencyId)

    if (error) throw error

    return (data?.[0] as tables["exchange_rates"]) ?? null
  }

  const query = useQuery({
    queryKey: ["exchange-rates", currencyId],
    queryFn: getData,
    enabled: !!currencyId,
  })

  return query
}
