import { Viewport } from "@models/game-board"
import {
  BUTTON_MIN_ZOOM_SIZE,
  BUTTON_MAX_ZOOM_SIZE,
  BUTTON_ZOOM_STEP,
} from "@utils/config"
import "@styles/components/game-board/ZoomControls.scss"

interface ZoomControlsProps {
  currentCellSize: number
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentCellSize,
  setViewport,
}: ZoomControlsProps) => {
  const handleZoomIn = () => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.min(
        BUTTON_MAX_ZOOM_SIZE,
        prevState.cellSize + BUTTON_ZOOM_STEP
      ),
    }))
  }

  const handleZoomOut = () => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.max(
        BUTTON_MIN_ZOOM_SIZE,
        prevState.cellSize - BUTTON_ZOOM_STEP
      ),
    }))
  }

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
