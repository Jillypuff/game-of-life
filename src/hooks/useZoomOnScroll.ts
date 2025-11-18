import { useCallback } from "react"
import { Viewport } from "@models/game-board"
import {
  SCROLL_MIN_ZOOM_SIZE,
  SCROLL_MAX_ZOOM_SIZE,
  SCROLL_ZOOM_STEP,
} from "@utils/config"

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
          newCellSize = Math.max(
            SCROLL_MIN_ZOOM_SIZE,
            prevState.cellSize - SCROLL_ZOOM_STEP
          )
        } else {
          newCellSize = Math.min(
            SCROLL_MAX_ZOOM_SIZE,
            prevState.cellSize + SCROLL_ZOOM_STEP
          )
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
