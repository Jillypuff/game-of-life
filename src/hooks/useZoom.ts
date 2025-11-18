import { useCallback, WheelEvent } from "react"
import { Viewport } from "@models/game-board"
import {
  SCROLL_MIN_ZOOM_SIZE,
  SCROLL_MAX_ZOOM_SIZE,
  SCROLL_ZOOM_STEP,
  BUTTON_MIN_ZOOM_SIZE,
  BUTTON_MAX_ZOOM_SIZE,
  BUTTON_ZOOM_STEP,
} from "@utils/config"

interface ZoomHandlers {
  handleZoomIn: () => void
  handleZoomOut: () => void
  onWheel: (e: WheelEvent<HTMLCanvasElement>) => void
}

export const useZoom = (
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
): ZoomHandlers => {
  const handleZoomIn = useCallback(() => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.min(
        BUTTON_MAX_ZOOM_SIZE,
        prevState.cellSize + BUTTON_ZOOM_STEP
      ),
    }))
  }, [setViewport])

  const handleZoomOut = useCallback(() => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.max(
        BUTTON_MIN_ZOOM_SIZE,
        prevState.cellSize - BUTTON_ZOOM_STEP
      ),
    }))
  }, [setViewport])

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLCanvasElement>) => {
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
    handleZoomIn,
    handleZoomOut,
    onWheel: handleWheel,
  }
}
