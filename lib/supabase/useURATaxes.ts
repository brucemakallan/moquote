import { useQuery } from "@tanstack/react-query"

import { supabase } from "~core/supabase"
import { cleanCapacity, cleanModal, cleanYear } from "~helpers/numbers"
import type { tables } from "~types/database"

type Args = {
  year?: string
  capacity?: string
  modal?: string
}

export function useURATaxes(args: Args) {
  const { year, capacity, modal } = args

  const getData = async () => {
    const capacityClean = cleanCapacity(capacity)
    const capacityRounded = Math.ceil(capacityClean / 100) * 100

    const { data, error } = await supabase
      .from("ura_taxes")
      .select("*")
      .ilike("description", `%${cleanYear(year)}%`)
      .ilike("description", `%${cleanModal(modal)}%`)
      .ilike("capacity", `%${capacityRounded}%`)

    console.log({ data, error })

    if (error) throw error

    return (data?.[0] as tables["ura_taxes"]) ?? null
  }

  const query = useQuery({
    queryKey: ["ura-taxes", year, capacity, modal],
    queryFn: getData,
    enabled: !!year && !!capacity && !!modal,
  })

  return query
}
