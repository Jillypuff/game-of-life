import { useRef, MouseEvent } from "react"
import { useCanvasDrawing } from "@hooks/useCanvasDrawing"
import type { Viewport } from "@models/game-board"
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
  onClickCell: (cellX: number, cellY: number) => void
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
  onClickCell,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvasDrawing({
    canvasRef,
    liveCells,
    viewport,
    width,
    height,
  })

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const pixelX = e.clientX - rect.left
    const pixelY = e.clientY - rect.top

    const cellX = Math.floor(pixelX / viewport.cellSize + viewport.xOffset)
    const cellY = Math.floor(pixelY / viewport.cellSize + viewport.yOffset)

    onClickCell(cellX, cellY)
  }

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
      onClick={handleCanvasClick}
    />
  )
}

export default GameCanvas
