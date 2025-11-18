import { useRef, useEffect } from "react"
import type { Viewport } from "@models/game-board"
import { keyToCoord } from "@utils/converter"
import "@styles/components/game-board/GameCanvas.scss"

interface GameCanvasProps {
  liveCells: Set<string>
  viewport: Viewport
  width: number
  height: number
  onPointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (e: React.PointerEvent<HTMLCanvasElement>) => void
  onWheel: (e: React.WheelEvent<HTMLCanvasElement>) => void
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  liveCells,
  viewport,
  width,
  height,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onWheel,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { xOffset, yOffset, cellSize } = viewport

  useEffect(() => {
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

  return (
    <canvas
      className="game-board-canvas"
      ref={canvasRef}
      width={width}
      height={height}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
    />
  )
}

export default GameCanvas
