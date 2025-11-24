import SpeedSlider from "./SpeedSlider"
import ZoomControls from "./ZoomButtons"
import PlaybackButtons from "./PlaybackButtons"
import "@styles/components/game-board/controls/ControlPanel.scss"

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
    <div className="control-panel-wrapper">
      <div className="control-panel-items">
        <ZoomControls
          currentCellSize={cellSize}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          resetZoom={resetZoom}
        />
        <button type="button" onClick={resetCells}>
          Reset Cells
        </button>
        <PlaybackButtons
          toggleRunning={toggleRunning}
          isRunning={isRunning}
          liveCellSize={liveCellsSize}
        />
        <SpeedSlider currentSpeed={speed} onChange={setGameSpeed} />
      </div>
    </div>
  )
}

export default ControlPanel
