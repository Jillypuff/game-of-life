import { useState } from "react"
import GameCanvas from "./GameCanvas"
import ZoomControls from "./controls/ZoomControls"
import { usePan } from "@hooks/usePan"
import { useZoom } from "@hooks/useZoom"
import { useGameEngine } from "@hooks/useGameEngine"
import type { Viewport } from "@models/game-board"
import { CANVAS_WIDTH, CANVAS_HEIGHT, DEFAULT_VIEWPORT } from "@utils/config"
import "@styles/components/game-board/GameBoard.scss"

const GameBoard = () => {
  const {
    liveCells,
    toggleCell: handleCellClick,
    resetCells,
    advanceGeneration,
  } = useGameEngine()
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT)

  const panHandlers = usePan(viewport, setViewport)
  const zoomHandlers = useZoom(setViewport)

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
        getHasMoved={panHandlers.getHasMoved}
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
          Advance
        </button>
      </div>
    </div>
  )
}

export default GameBoard
