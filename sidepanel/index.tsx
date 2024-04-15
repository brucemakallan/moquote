import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../style.css"

import { Toaster } from "~components/ui/toaster"

import { App } from "./App"

const queryClient = new QueryClient()

function SidePanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  )
}

export default SidePanel
