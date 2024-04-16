export type Currency = "UGX"

export type tables = {
  ura_taxes: {
    id: number
    created_at: string
    pdf_number: number
    hsc_code: string
    country_code?: string
    description: string
    capacity?: string
    ura_tax: string
  }
  exchange_rates: {
    id: Currency
    created_at: string
    value: number
    updated_at: string
  }
  quote_requests: {
    id?: number
    email: string
    url: string
    heading: string
    price?: number
    year?: string
    capacity?: string
    model?: string
    image_url?: string
    ugx_rate?: number
    tax?: number
  }
}
