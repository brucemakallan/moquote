export const convertToFloat = (value?: string) => {
  if (!value) return 0

  const clean = value.replace(/[^0-9.]/g, "")
  const floatValue = parseFloat(clean)
  return isNaN(floatValue) ? 0 : floatValue
}

export const cleanYear = (value?: string) => {
  if (!value) return null

  const [year, _month] = value.split("/")
  return convertToFloat(year)
}

export const cleanCapacity = (value?: string) => {
  if (!value) return null

  return convertToFloat(value)
}

export const cleanModel = (value?: string) => {
  if (!value) return null

  const [_code1, code2] = value.split("-")
  return code2
}
