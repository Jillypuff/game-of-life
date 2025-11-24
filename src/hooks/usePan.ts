import { useRef, useCallback, PointerEvent } from "react"
import { Viewport } from "@models/game-board"
import { clampOffset } from "@utils/viewport"
import { DRAG_THRESHOLD } from "@utils/config"

interface DragState {
  isDragging: boolean
  lastX: number
  lastY: number
  initialX: number
  initialY: number
}

interface PanHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (e: React.PointerEvent<HTMLCanvasElement>) => void
  getHasMoved: () => boolean
}

export const usePan = (
  viewport: Viewport,
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
): PanHandlers => {
  const dragState = useRef<DragState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    initialX: 0,
    initialY: 0,
  })
  const hasMovedRef = useRef(false)

  const handlePointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    e.preventDefault()
    if (e.button !== 0) return

    dragState.current.isDragging = true
    dragState.current.lastX = e.clientX
    dragState.current.lastY = e.clientY

    hasMovedRef.current = false
    dragState.current.initialX = e.clientX
    dragState.current.initialY = e.clientY

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
      if (
        Math.abs(e.clientX - dragState.current.initialX) > DRAG_THRESHOLD ||
        Math.abs(e.clientY - dragState.current.initialY) > DRAG_THRESHOLD
      ) {
        hasMovedRef.current = true
      }

      setViewport((prevViewport) => {
        const newX = prevViewport.xOffset + dCellX
        const newY = prevViewport.yOffset + dCellY

        return {
          ...prevViewport,
          xOffset: clampOffset(newX, "x", cellSize),
          yOffset: clampOffset(newY, "y", cellSize),
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
    getHasMoved: () => hasMovedRef.current,
  }
}
