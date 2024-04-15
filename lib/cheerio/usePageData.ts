import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const isValidVehicleUrl = (url: string) => {
  return (
    url.startsWith(process.env.PLASMO_PUBLIC_SITE_URL) && url.includes("/id/")
  )
}

export function usePageData(url?: string) {
  const enabled = !!url && isValidVehicleUrl(url)

  const getPageData = async () => {
    const pageResponse = await axios.get(url, {
      headers: {
        Accept: "text/html",
      },
    })
    const data = pageResponse.data

    if (!data) throw new Error("No page data found")

    return data
  }

  const query = useQuery({
    queryKey: ["page-data", url],
    queryFn: getPageData,
    enabled,
  })

  return query
}
