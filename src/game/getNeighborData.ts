import { coordToKey } from "@utils/converter"

const getNeighborData = (
  cellX: number,
  cellY: number,
  liveCells: Set<string>,
  collectCandidates: boolean
) => {
  let liveNeighborCount = 0
  const newCandidates = new Set<string>()

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue

      const neighborKey = coordToKey(cellX + i, cellY + j)

      if (liveCells.has(neighborKey)) {
        liveNeighborCount++
      } else if (collectCandidates) {
        newCandidates.add(neighborKey)
      }
    }
  }
  return { liveNeighborCount, newCandidates }
}

export default getNeighborData
