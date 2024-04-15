import { GenericAlert } from "./GenericAlert"

export function EmptyState() {
  const url = process.env.PLASMO_PUBLIC_SITE_URL

  return (
    <GenericAlert title="Oops!" className="p-4">
      <p>
        Missing vehicle information. Please select a vehicle from the{" "}
        <a href={url} target="_blank">
          supported portal.
        </a>
      </p>
    </GenericAlert>
  )
}
