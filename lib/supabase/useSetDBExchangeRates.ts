import { useMutation } from "@tanstack/react-query"

import { supabase } from "~core/supabase"
import type { Currency, tables } from "~types/database"

type Args = {
  currencyId: Currency
  value: number
}

export function useSetDBExchangeRates() {
  const setData = async (args: Args) => {
    const { currencyId, value } = args
    const { data, error } = await supabase
      .from("exchange_rates")
      .update({
        value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currencyId)
      .select("*")

    if (error) throw error

    return (data?.[0] as tables["exchange_rates"]) ?? null
  }

  const mutation = useMutation({
    mutationFn: setData,
  })

  return mutation
}
