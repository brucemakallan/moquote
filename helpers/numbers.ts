export const convertToFloat = (value?: string) => {
  if (!value) return 0

  const clean = value.replace(/,|;|\s|_|-/g, "")
  const floatValue = parseFloat(clean)
  return isNaN(floatValue) ? 0 : floatValue
}
