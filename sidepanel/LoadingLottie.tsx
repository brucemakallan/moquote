import Lottie from "lottie-react"

import animationData from "../assets/lotties/loading-car.json"

export function LoadingLottie() {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
