import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../style.css"

import { App } from "./App"

const queryClient = new QueryClient()

function SidePanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

export default SidePanel
