import { useQuery } from "@tanstack/react-query"

import { supabase } from "~core/supabase"
import { cleanCapacity, cleanModel, cleanYear } from "~helpers/numbers"
import type { tables } from "~types/database"

type Args = {
  year?: string
  capacity?: string
  model?: string
}

export function useURATaxes(enabled: boolean, args: Args) {
  const { year, capacity, model } = args

  const getData = async () => {
    const capacityClean = cleanCapacity(capacity)
    const capacityRounded10 = Math.ceil(capacityClean / 10) * 10
    const capacityRounded100 = Math.ceil(capacityClean / 100) * 100

    const { data, error } = await supabase
      .from("ura_taxes")
      .select("*")
      .ilike("description", `%${cleanYear(year)}%`)
      .ilike("description", `%${cleanModel(model)}%`)
      .or(
        `capacity.ilike.%${capacityClean}%,capacity.ilike.%${capacityRounded10}%,capacity.ilike.%${capacityRounded100}%`,
      )

    if (error) throw error

    return (data?.[0] as tables["ura_taxes"]) ?? null
  }

  const query = useQuery({
    queryKey: ["ura-taxes", year, capacity, model],
    queryFn: getData,
    enabled: enabled && !!year && !!capacity && !!model,
  })

  return query
}
