import { Storage } from "@plasmohq/storage"

import { CURRENT_URL_KEY } from "~helpers/constants"

export {}

const storage = new Storage()

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  })

  return tab
}

chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, _tab) => {
  getCurrentTab()
    .then((currentTab) => {
      if (currentTab) {
        storage.set(CURRENT_URL_KEY, currentTab.url)
      }
    })
    .catch((error) => console.error(error))
})

chrome.tabs.onActivated.addListener((_activeInfo) => {
  getCurrentTab()
    .then((currentTab) => {
      if (currentTab) {
        storage.set(CURRENT_URL_KEY, currentTab.url)
      }
    })
    .catch((error) => console.error(error))
})
