import { useState, useCallback } from "react"
import { coordToKey } from "@utils/converter"

export const useCellLogic = () => {
  const [liveCells, setLiveCells] = useState<Set<string>>(new Set<string>())

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

  return {
    liveCells,
    toggleCell,
    resetCells,
  }
}
