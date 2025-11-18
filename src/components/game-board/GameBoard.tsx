import { useState } from "react"
import GameCanvas from "./GameCanvas"
import ZoomControls from "./ZoomControls"
import { usePan } from "@hooks/usePan"
import { useZoom } from "@hooks/useZoom"
import { useCellLogic } from "@hooks/useCellLogic"
import type { Viewport } from "@models/game-board"
import { CANVAS_WIDTH, CANVAS_HEIGHT, DEFAULT_VIEWPORT } from "@utils/config"
import "@styles/components/game-board/GameBoard.scss"

const GameBoard = () => {
  const { liveCells, toggleCell: handleCellClick, resetCells } = useCellLogic()
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT)

  const panHandlers = usePan(viewport, setViewport)
  const zoomHandlers = useZoom(setViewport)

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
        onWheel={zoomHandlers.onWheel}
        onClickCell={handleCellClick}
      />
      <div>
        <ZoomControls
          currentCellSize={viewport.cellSize}
          handleZoomIn={zoomHandlers.handleZoomIn}
          handleZoomOut={zoomHandlers.handleZoomOut}
        />
        <button type="button" onClick={resetCells}>
          Reset Cells
        </button>
        <button type="button" onClick={advanceGeneration}>
          Fake generation
        </button>
      </div>
    </div>
  )
}

export default GameBoard
