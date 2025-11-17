import { useCallback } from "react"
import { Viewport } from "@models/game-board"

const MIN_ZOOM_SIZE = 5
const MAX_ZOOM_SIZE = 50
const ZOOM_STEP = 2

export const useZoomOnScroll = (
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
) => {
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault()

      const scrollDirection = Math.sign(e.deltaY)

      setViewport((prevState) => {
        let newCellSize: number

        if (scrollDirection > 0) {
          newCellSize = Math.max(MIN_ZOOM_SIZE, prevState.cellSize - ZOOM_STEP)
        } else {
          newCellSize = Math.min(MAX_ZOOM_SIZE, prevState.cellSize + ZOOM_STEP)
        }

        return {
          ...prevState,
          cellSize: newCellSize,
        }
      })
    },
    [setViewport]
  )

  return {
    onWheel: handleWheel,
  }
}
