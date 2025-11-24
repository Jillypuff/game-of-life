import { useState } from "react"
import GameCanvas from "./GameCanvas"
import ControlPanel from "./controls/ControlPanel"
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
    toggleRunning,
    setGameSpeed,
    isRunning,
    speed,
  } = useGameEngine()
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT)

  const panHandlers = usePan(viewport, setViewport)
  const zoomHandlers = useZoom(setViewport)

  return (
    <div className="game-board-container">
      <GameCanvas
        liveCells={liveCells}
        viewport={viewport}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        {...panHandlers}
        onWheel={zoomHandlers.onWheel}
        onClickCell={isRunning ? () => {} : handleCellClick}
        getHasMoved={panHandlers.getHasMoved}
      />
      onClickCell
      <ControlPanel
        cellSize={viewport.cellSize}
        handleZoomIn={zoomHandlers.handleZoomIn}
        handleZoomOut={zoomHandlers.handleZoomOut}
        resetZoom={zoomHandlers.resetZoom}
        resetCells={resetCells}
        toggleRunning={toggleRunning}
        setGameSpeed={setGameSpeed}
        isRunning={isRunning}
        speed={speed}
        liveCellsSize={liveCells.size}
      />
    </div>
  )
}

export default GameBoard
