import { EmptyPageLottie } from "~components/lotties/EmptyPageLottie"

import { GenericAlert } from "./GenericAlert"

export function EmptyState() {
  const url = process.env.PLASMO_PUBLIC_SITE_URL

  return (
    <div className="flex flex-col gap-4">
      <EmptyPageLottie className="w-full" />

      <GenericAlert title="Oops!" className="p-4">
        <p>
          Missing vehicle information. Please select a vehicle from the{" "}
          <a href={url} target="_blank">
            supported portal.
          </a>
        </p>
      </GenericAlert>
    </div>
  )
}
