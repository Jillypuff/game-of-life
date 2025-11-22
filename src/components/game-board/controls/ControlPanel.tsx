import SpeedSlider from "./SpeedSlider"
import ZoomControls from "./ZoomButtons"

interface ControlPanelProps {
  cellSize: number
  handleZoomIn: () => void
  handleZoomOut: () => void
  resetZoom: () => void
  resetCells: () => void
  toggleRunning: () => void
  setGameSpeed: (speed: number) => void
  isRunning: boolean
  speed: number
  liveCellsSize: number
}

const ControlPanel = ({
  cellSize,
  handleZoomIn,
  handleZoomOut,
  resetZoom,
  resetCells,
  toggleRunning,
  setGameSpeed,
  isRunning,
  speed,
  liveCellsSize,
}: ControlPanelProps) => {
  return (
    <div>
      <ZoomControls
        currentCellSize={cellSize}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        resetZoom={resetZoom}
      />
      <button
        type="button"
        onClick={toggleRunning}
        disabled={!isRunning && liveCellsSize === 0}
      >
        {isRunning ? "Pause" : "Run"}
      </button>
      <button type="button" onClick={resetCells}>
        Reset Cells
      </button>
      <SpeedSlider currentSpeed={speed} onChange={setGameSpeed} />
    </div>
  )
}

export default ControlPanel
