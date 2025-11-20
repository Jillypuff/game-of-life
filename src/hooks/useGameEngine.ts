import { useState, useCallback, useEffect } from "react"
import { getNextGeneration } from "@game/getNextGeneration"
import { coordToKey } from "@utils/converter"
import { DEFAULT_SPEED_MS } from "@utils/config"

export const useGameEngine = () => {
  const [liveCells, setLiveCells] = useState<Set<string>>(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(DEFAULT_SPEED_MS)

  const toggleCell = useCallback((cellX: number, cellY: number) => {
    const key = coordToKey(cellX, cellY)

    setLiveCells((prevCells) => {
      const newCells = new Set(prevCells)
      if (newCells.has(key)) newCells.delete(key)
      else newCells.add(key)
      return newCells
    })
  }, [])

  const resetCells = useCallback(() => {
    setLiveCells(new Set<string>())
    setIsRunning(false)
  }, [])

  const advanceGeneration = useCallback(() => {
    setLiveCells((currentCells) => {
      if (currentCells.size === 0) {
        setIsRunning(false)
        return currentCells
      }
      return getNextGeneration(currentCells)
    })
  }, [])

  const toggleRunning = useCallback(() => {
    setIsRunning((state) => !state)
  }, [])

  const setGameSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
  }, [])

  useEffect(() => {
    let intervalId: number | undefined

    if (isRunning) {
      intervalId = window.setInterval(() => {
        advanceGeneration()
      }, speed)
    }

    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [isRunning, speed, advanceGeneration])

  return {
    liveCells,
    isRunning,
    speed,
    toggleCell,
    resetCells,
    toggleRunning,
    setGameSpeed,
  }
}
