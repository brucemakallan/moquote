import { useQuery } from "@tanstack/react-query"
import * as cheerio from "cheerio"
import { camelCase, get } from "lodash"

export type ScrapePageData = {
  heading: string
  totalPrice: string
  year: string
  capacity: string
  model: string
  imageUrl: string
}

export function useScrapePageData(pageData?: any) {
  const scrapePage = async (): Promise<ScrapePageData> => {
    const $ = cheerio.load(pageData)

    const heading = $(".car-info-flex-box").find("h1").first().text()
    const image = $("#fn-imgMain-a").attr("href")
    const imageUrl = image ? `https:${image}` : ""
    const totalPrice = $("#fn-vehicle-price-total-price").text()

    const specsTable = $("table.specification")
    const th = specsTable
      .find("th")
      .map((_, el) => $(el).text())
      .toArray()
    const td = specsTable
      .find("td")
      .map((_, el) => $(el).text())
      .toArray()

    const tableObject = th.reduce(
      (acc, heading, index) => ({
        ...acc,
        [camelCase(heading)]: get(td, index, "").replace(/\n\t/g, "").trim(),
      }),
      {},
    )

    const year = tableObject["registrationYearMonth"]
    const capacity = tableObject["engineSize"]
    const model = tableObject["modelCode"]

    if (!totalPrice || !year || !capacity || !model) {
      throw new Error(
        "Missing vehicle information. Please select a specific vehicle to proceed.",
      )
    }

    return {
      heading,
      totalPrice,
      year,
      capacity,
      model,
      imageUrl,
    }
  }

  const query = useQuery({
    queryKey: ["scrape-page", pageData],
    queryFn: scrapePage,
    enabled: !!pageData,
  })

  return query
}
