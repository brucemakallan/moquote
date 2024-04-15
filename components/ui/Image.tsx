import { useEffect, useState } from "react"

import { LoadingLottie } from "~components/lotties/LoadingLottie"

interface Props {
  src: string
  alt: string
  className?: string
  isLoading?: boolean
}

export function Image(props: Props) {
  const { src, alt, className, isLoading } = props

  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full flex justify-center ">
      {(!loaded || isLoading) && <LoadingLottie className="w-40 h-40" />}
      {!!src && !isLoading && (
        <img
          style={loaded ? { width: "100%" } : { display: "none" }}
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}
