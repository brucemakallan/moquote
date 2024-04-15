import Lottie from "lottie-react"

import animationData from "../../assets/lotties/empty-box.json"

export function EmptyPageLottie({ className }: { className?: string }) {
  return (
    <div className={className}>
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
