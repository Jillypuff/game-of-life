import { useCallback, WheelEvent } from "react"
import { Viewport } from "@models/game-board"
import {
  SCROLL_MIN_ZOOM_SIZE,
  SCROLL_MAX_ZOOM_SIZE,
  SCROLL_ZOOM_STEP,
  BUTTON_MIN_ZOOM_SIZE,
  BUTTON_MAX_ZOOM_SIZE,
  BUTTON_ZOOM_STEP,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "@utils/config"

interface ZoomHandlers {
  handleZoomIn: () => void
  handleZoomOut: () => void
  onWheel: (e: WheelEvent<HTMLCanvasElement>) => void
}

export const useZoom = (
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
): ZoomHandlers => {
  const adjustOffset = (prev: Viewport, newCellSize: number): Viewport => {
    const oldCellSize = prev.cellSize
    const centerCellX = prev.xOffset + CANVAS_WIDTH / 2 / oldCellSize
    const centerCellY = prev.yOffset + CANVAS_HEIGHT / 2 / oldCellSize
    const newXOffset = centerCellX - CANVAS_WIDTH / 2 / newCellSize
    const newYOffset = centerCellY - CANVAS_HEIGHT / 2 / newCellSize

    return {
      ...prev,
      cellSize: newCellSize,
      xOffset: newXOffset,
      yOffset: newYOffset,
    }
  }

  const handleZoomIn = useCallback(() => {
    setViewport((prevState) => {
      const newCellSize = Math.min(
        BUTTON_MAX_ZOOM_SIZE,
        prevState.cellSize + BUTTON_ZOOM_STEP
      )
      return adjustOffset(prevState, newCellSize)
    })
  }, [setViewport])

  const handleZoomOut = useCallback(() => {
    setViewport((prevState) => {
      const newCellSize = Math.max(
        BUTTON_MIN_ZOOM_SIZE,
        prevState.cellSize - BUTTON_ZOOM_STEP
      )
      return adjustOffset(prevState, newCellSize)
    })
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
