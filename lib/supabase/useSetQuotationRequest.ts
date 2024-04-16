import { useMutation } from "@tanstack/react-query"

import { supabase } from "~core/supabase"
import type { tables } from "~types/database"

export type QuotationRequest = {
  email: string
  url: string
  heading: string
  price: number
  year: string
  capacity: string
  model: string
  imageUrl: string
  ugxRate: number
  tax: number
}

export function useSetQuotationRequest(afterSuccess: () => void) {
  const setData = async (args: QuotationRequest) => {
    if (!args.email) throw new Error("Email is required")
    if (!args.url) throw new Error("URL is required")

    const input: tables["quote_requests"] = {
      email: args.email,
      url: args.url,
      heading: args.heading,
      price: args.price,
      year: args.year,
      capacity: args.capacity,
      model: args.model,
      image_url: args.imageUrl,
      ugx_rate: args.ugxRate,
      tax: args.tax,
    }

    const { error } = await supabase
      .from("quote_requests")
      .insert(input)

    if (error) throw error

    return null
  }

  const mutation = useMutation({
    mutationFn: setData,
    onSuccess: () => {
      afterSuccess()
    },
  })

  return mutation
}
