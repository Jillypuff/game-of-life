import { Viewport } from "@models/game-board"
import "@styles/components/game-board/ZoomControls.scss"

interface ZoomControlsProps {
  currentCellSize: number
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
}

const MIN_ZOOM_SIZE = 5
const MAX_ZOOM_SIZE = 50
const ZOOM_STEP = 5

const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentCellSize,
  setViewport,
}: ZoomControlsProps) => {
  const handleZoomIn = () => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.min(MAX_ZOOM_SIZE, prevState.cellSize + ZOOM_STEP),
    }))
  }

  const handleZoomOut = () => {
    setViewport((prevState) => ({
      ...prevState,
      cellSize: Math.max(MIN_ZOOM_SIZE, prevState.cellSize - ZOOM_STEP),
    }))
  }

  return (
    <div>
      <button
        className="zoom-button"
        onClick={handleZoomOut}
        type="button"
        disabled={currentCellSize <= MIN_ZOOM_SIZE}
        aria-label="Zoom Out"
      >
        −
      </button>
      <button
        className="zoom-button"
        onClick={handleZoomIn}
        type="button"
        disabled={currentCellSize >= MAX_ZOOM_SIZE}
        aria-label="Zoom In"
      >
        +
      </button>
    </div>
  )
}

export default ZoomControls
