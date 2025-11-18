export const keyToCoord = (key: string): [number, number] => {
  const [x, y] = key.split(",").map(Number)
  return [x, y]
}

export const coordToKey = (x: number, y: number): string => `${x},${y}`
