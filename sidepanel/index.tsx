import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../style.css"

import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { getCurrentTab } from "~background"
import { Toaster } from "~components/ui/toaster"
import { CURRENT_URL_KEY } from "~helpers/constants"

import { App } from "./App"

const queryClient = new QueryClient()

function SidePanel() {
  const [_, setCurrentUrl] = useStorage(CURRENT_URL_KEY)

  useEffect(() => {
    getCurrentTab()
      .then((currentTab) => {
        if (currentTab?.url) {
          setCurrentUrl(currentTab.url)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  )
}

export default SidePanel
