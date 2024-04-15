import { useMediaQuery } from "react-responsive"

export function useResponsive() {
  const isSm = useMediaQuery({ query: "(min-width: 640px)" })

  const isMd = useMediaQuery({ query: "(min-width: 768px)" })

  const isLg = useMediaQuery({ query: "(min-width: 1024px)" })

  const isXl = useMediaQuery({ query: "(min-width: 1280px)" })

  const is2xl = useMediaQuery({ query: "(min-width: 1536px)" })

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" })

  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" })

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isPortrait,
    isRetina,
  }
}
