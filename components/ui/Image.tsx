import { useState } from "react"

import { LoadingLottie } from "~sidepanel/LoadingLottie"

interface Props {
  src: string
  alt: string
  className?: string
}

export function Image(props: Props) {
  const { src, alt, className } = props

  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full flex justify-center ">
      {loaded ? null : (
        <div className="w-40 h-40">
          <LoadingLottie />
        </div>
      )}
      {!!src && (
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
