import { useState } from "react"
import GameCanvas from "./GameCanvas"
import ZoomControls from "./ZoomControls"
import { usePan } from "@hooks/usePan"
import { useZoomOnScroll } from "@hooks/useZoomOnScroll"
import type { Viewport } from "@models/game-board"
import { coordToKey } from "@utils/converter"
import "@styles/components/game-board/GameBoard.scss"

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const GameBoard = () => {
  const [liveCells, setLiveCells] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    initial.add(coordToKey(50, 50))
    initial.add(coordToKey(50, 51))
    initial.add(coordToKey(50, 52))
    return initial
  })

  const [viewport, setViewport] = useState<Viewport>({
    xOffset: 40,
    yOffset: 40,
    cellSize: 10,
  })

  const panHandlers = usePan(viewport, setViewport)
  const zoomHandlers = useZoomOnScroll(setViewport)

  const advanceGeneration = () => {
    console.log("Let's go forward")
  }

  return (
    <div>
      <GameCanvas
        liveCells={liveCells}
        viewport={viewport}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        {...panHandlers}
        {...zoomHandlers}
      />
      <div>
        <ZoomControls
          currentCellSize={viewport.cellSize}
          setViewport={setViewport}
        />
        <button type="button" onClick={advanceGeneration}>
          Fake generation
        </button>
      </div>
    </div>
  )
}

export default GameBoard
