import { useState, useCallback } from "react"
import { getNextGeneration } from "@game/getNextGeneration"
import { coordToKey } from "@utils/converter"

export const useGameEngine = () => {
  const [liveCells, setLiveCells] = useState<Set<string>>(new Set())

  const toggleCell = useCallback((cellX: number, cellY: number) => {
    const key = coordToKey(cellX, cellY)

    setLiveCells((prevCells) => {
      const newCells = new Set(prevCells)
      if (newCells.has(key)) newCells.delete(key)
      else newCells.add(key)
      return newCells
    })
  }, [])

  const resetCells = () => {
    setLiveCells(new Set<string>())
  }

  const advanceGeneration = useCallback(() => {
    const nextCells = getNextGeneration(liveCells)
    setLiveCells(nextCells)
  }, [liveCells])

  return {
    liveCells,
    toggleCell,
    resetCells,
    advanceGeneration,
  }
}
