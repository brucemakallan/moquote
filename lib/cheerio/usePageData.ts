import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function usePageData(url?: string) {
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
    enabled: !!url,
  })

  return query
}
