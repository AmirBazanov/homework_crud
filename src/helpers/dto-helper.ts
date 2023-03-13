// eslint-disable-next-line @typescript-eslint/ban-types
export const toJson = (data: string | Object) => {
  return JSON.stringify(data, (_, v) =>
    typeof v === 'bigint' ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a)
}
