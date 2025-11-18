import { useRef, useCallback, PointerEvent } from "react"
import { Viewport } from "@models/game-board"
import {
  MIN_OFFSET_X,
  MAX_OFFSET_X,
  MIN_OFFSET_Y,
  MAX_OFFSET_Y,
} from "@utils/config"

interface PanHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (e: React.PointerEvent<HTMLCanvasElement>) => void
}

export const usePan = (
  viewport: Viewport,
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
): PanHandlers => {
  const dragState = useRef({ isDragging: false, lastX: 0, lastY: 0 })

  const clampOffset = (offset: number, axis: "x" | "y"): number => {
    const min = axis === "x" ? MIN_OFFSET_X : MIN_OFFSET_Y
    const max = axis === "x" ? MAX_OFFSET_X : MAX_OFFSET_Y
    return Math.max(min, Math.min(max, offset))
  }

  const handlePointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return

    dragState.current.isDragging = true
    dragState.current.lastX = e.clientX
    dragState.current.lastY = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (!dragState.current.isDragging) return

      const { cellSize } = viewport

      const dx = e.clientX - dragState.current.lastX
      const dy = e.clientY - dragState.current.lastY

      const dCellX = -dx / cellSize
      const dCellY = -dy / cellSize

      setViewport((prevViewport) => {
        const newX = prevViewport.xOffset + dCellX
        const newY = prevViewport.yOffset + dCellY

        return {
          ...prevViewport,
          xOffset: clampOffset(newX, "x"),
          yOffset: clampOffset(newY, "y"),
        }
      })

      dragState.current.lastX = e.clientX
      dragState.current.lastY = e.clientY
    },
    [viewport, setViewport]
  )

  const handlePointerUp = useCallback((e: PointerEvent<HTMLElement>) => {
    dragState.current.isDragging = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }, [])

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
  }
}
