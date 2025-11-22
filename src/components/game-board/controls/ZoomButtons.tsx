import { BUTTON_MIN_ZOOM_SIZE, BUTTON_MAX_ZOOM_SIZE } from "@utils/config"
import "@styles/components/game-board/controls/ZoomButtons.scss"

interface ZoomControlsProps {
  currentCellSize: number
  handleZoomIn: () => void
  handleZoomOut: () => void
  resetZoom: () => void
}

const ZoomControls = ({
  currentCellSize,
  handleZoomIn,
  handleZoomOut,
  resetZoom,
}: ZoomControlsProps) => {
  return (
    <div className="zoom-button-container">
      <button
        onClick={handleZoomOut}
        type="button"
        disabled={currentCellSize <= BUTTON_MIN_ZOOM_SIZE}
        aria-label="Zoom Out"
      >
        −
      </button>
      <button onClick={resetZoom} type="button" aria-label="Reset Zoom">
        Reset zoom
      </button>
      <button
        onClick={handleZoomIn}
        type="button"
        disabled={currentCellSize >= BUTTON_MAX_ZOOM_SIZE}
        aria-label="Zoom In"
      >
        +
      </button>
    </div>
  )
}

export default ZoomControls
