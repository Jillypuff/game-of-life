import { Viewport } from "@models/game-board"

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600

export const DEFAULT_VIEWPORT: Viewport = {
  xOffset: 40,
  yOffset: 40,
  cellSize: 10,
}

export const BUTTON_MIN_ZOOM_SIZE = 5
export const BUTTON_MAX_ZOOM_SIZE = 50
export const BUTTON_ZOOM_STEP = 5

export const SCROLL_MIN_ZOOM_SIZE = 5
export const SCROLL_MAX_ZOOM_SIZE = 50
export const SCROLL_ZOOM_STEP = 1

export const MIN_OFFSET_X = -20
export const MAX_OFFSET_X = 120
export const MIN_OFFSET_Y = -20
export const MAX_OFFSET_Y = 120
