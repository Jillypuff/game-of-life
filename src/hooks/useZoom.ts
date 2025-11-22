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
  DEFAULT_CELL_SIZE,
} from "@utils/config"

interface ZoomHandlers {
  handleZoomIn: () => void
  handleZoomOut: () => void
  resetZoom: () => void
  onWheel: (e: WheelEvent<HTMLCanvasElement>) => void
}

export const useZoom = (
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
): ZoomHandlers => {
  const adjustOffset = (
    prev: Viewport,
    newCellSize: number,
    anchorX: number = CANVAS_WIDTH / 2,
    anchorY: number = CANVAS_HEIGHT / 2
  ): Viewport => {
    const oldCellSize = prev.cellSize
    const anchorCellX = prev.xOffset + anchorX / oldCellSize
    const anchorCellY = prev.yOffset + anchorY / oldCellSize
    const newXOffset = anchorCellX - anchorX / newCellSize
    const newYOffset = anchorCellY - anchorY / newCellSize

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

  const resetZoom = useCallback(() => {
    setViewport((prevState) => {
      if (prevState.cellSize === DEFAULT_CELL_SIZE) {
        return prevState
      }
      return adjustOffset(prevState, DEFAULT_CELL_SIZE)
    })
  }, [setViewport])

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault()

      const scrollDirection = Math.sign(e.deltaY)
      const rect = e.currentTarget.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

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

        if (newCellSize === prevState.cellSize) {
          return prevState
        }

        return adjustOffset(prevState, newCellSize, mouseX, mouseY)
      })
    },
    [setViewport]
  )

  return {
    handleZoomIn,
    handleZoomOut,
    resetZoom,
    onWheel: handleWheel,
  }
}
