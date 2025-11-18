import { BUTTON_MIN_ZOOM_SIZE, BUTTON_MAX_ZOOM_SIZE } from "@utils/config"
import "@styles/components/game-board/ZoomControls.scss"

interface ZoomControlsProps {
  currentCellSize: number
  handleZoomIn: () => void
  handleZoomOut: () => void
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentCellSize,
  handleZoomIn,
  handleZoomOut,
}: ZoomControlsProps) => {
  return (
    <div>
      <button
        className="zoom-button"
        onClick={handleZoomOut}
        type="button"
        disabled={currentCellSize <= BUTTON_MIN_ZOOM_SIZE}
        aria-label="Zoom Out"
      >
        −
      </button>
      <button
        className="zoom-button"
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
