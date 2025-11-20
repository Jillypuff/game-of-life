import { keyToCoord } from "@utils/converter"
import getNeighborData from "@game/getNeighborData"

export const getNextGeneration = (
  currentLiveCells: Set<string>
): Set<string> => {
  const nextLiveCells = new Set<string>()
  const candidateDeadCells = new Set<string>()

  for (const key of currentLiveCells) {
    const [cellX, cellY] = keyToCoord(key)
    const { liveNeighborCount, newCandidates } = getNeighborData(
      cellX,
      cellY,
      currentLiveCells,
      true
    )
    newCandidates.forEach((cell) => candidateDeadCells.add(cell))
    if (liveNeighborCount === 2 || liveNeighborCount === 3) {
      nextLiveCells.add(key)
    }
  }

  for (const key of candidateDeadCells) {
    if (currentLiveCells.has(key)) {
      continue
    }

    const [cellX, cellY] = keyToCoord(key)
    const { liveNeighborCount } = getNeighborData(
      cellX,
      cellY,
      currentLiveCells,
      false
    )

    if (liveNeighborCount === 3) {
      nextLiveCells.add(key)
    }
  }

  return nextLiveCells
}
