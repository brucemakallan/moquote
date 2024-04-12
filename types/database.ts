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
}
