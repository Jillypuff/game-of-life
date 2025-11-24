import { Viewport } from "@models/game-board"
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MIN_OFFSET_X,
  MAX_OFFSET_X,
  MIN_OFFSET_Y,
  MAX_OFFSET_Y,
} from "./config"

export const clampOffset = (
  offset: number,
  axis: "x" | "y",
  cellSize: number
): number => {
  const minConst = axis === "x" ? MIN_OFFSET_X : MIN_OFFSET_Y
  const maxConst = axis === "x" ? MAX_OFFSET_X : MAX_OFFSET_Y
  const canvasDim = axis === "x" ? CANVAS_WIDTH : CANVAS_HEIGHT
  const maxAllowedOffset = maxConst - canvasDim / cellSize
  return Math.max(minConst, Math.min(maxAllowedOffset, offset))
}

export const getZoomAdjustedViewport = (
  prev: Viewport,
  newCellSize: number,
  anchorX: number = CANVAS_WIDTH / 2,
  anchorY: number = CANVAS_HEIGHT / 2
): Viewport => {
  const oldCellSize = prev.cellSize
  const anchorCellX = prev.xOffset + anchorX / oldCellSize
  const anchorCellY = prev.yOffset + anchorY / oldCellSize
  const rawXOffset = anchorCellX - anchorX / newCellSize
  const rawYOffset = anchorCellY - anchorY / newCellSize
  const newXOffset = clampOffset(rawXOffset, "x", newCellSize)
  const newYOffset = clampOffset(rawYOffset, "y", newCellSize)

  return {
    ...prev,
    cellSize: newCellSize,
    xOffset: newXOffset,
    yOffset: newYOffset,
  }
}
