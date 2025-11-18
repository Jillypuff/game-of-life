import { useEffect, RefObject } from "react"
import type { Viewport } from "@models/game-board"
import { keyToCoord } from "@utils/converter"

interface CanvasDrawingArgs {
  canvasRef: RefObject<HTMLCanvasElement | null>
  liveCells: Set<string>
  viewport: Viewport
  width: number
  height: number
}

export const useCanvasDrawing = ({
  canvasRef,
  liveCells,
  viewport,
  width,
  height,
}: CanvasDrawingArgs) => {
  const { xOffset, yOffset, cellSize } = viewport

  useEffect(() => {
    if (!canvasRef) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "#00CED1"

    const startX = Math.floor(xOffset)
    const startY = Math.floor(yOffset)
    const endX = Math.ceil(xOffset + width / cellSize)
    const endY = Math.ceil(yOffset + height / cellSize)

    for (const key of liveCells) {
      const [cellX, cellY] = keyToCoord(key)

      if (cellX >= startX && cellX < endX && cellY >= startY && cellY < endY) {
        const drawX = (cellX - xOffset) * cellSize
        const drawY = (cellY - yOffset) * cellSize
        ctx.fillRect(drawX, drawY, cellSize, cellSize)
      }
    }

    if (cellSize >= 10) {
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 0.5

      for (let i = startX; i <= endX; i++) {
        const x = (i - xOffset) * cellSize
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let j = startY; j <= endY; j++) {
        const y = (j - yOffset) * cellSize
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }
  }, [liveCells, viewport, width, height])
}
