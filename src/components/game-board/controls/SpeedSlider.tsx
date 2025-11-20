import React from "react"
import { SLIDER_FPS_MIN, SLIDER_FPS_MAX, SLIDER_FPS_STEP } from "@utils/config"
import "@styles/components/game-board/controls/SpeedSlider.scss"

interface SpeedSliderProps {
  currentSpeed: number
  onChange: (speed: number) => void
}

const SpeedSlider = ({ currentSpeed, onChange }: SpeedSliderProps) => {
  const currentFPS = Math.round(1000 / currentSpeed)

  const sliderValue = Math.max(
    SLIDER_FPS_MIN,
    Math.min(SLIDER_FPS_MAX, currentFPS)
  )

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFPS = parseInt(e.target.value, 10)
    const newSpeedMS = 1000 / newFPS

    onChange(newSpeedMS)
  }

  const fpsLabel = currentFPS.toFixed(0)

  return (
    <div className="slider">
      <label htmlFor="game-speed">
        Speed ({fpsLabel} generations/sec)
        <br />
      </label>
      <input
        id="game-speed"
        type="range"
        min={SLIDER_FPS_MIN}
        max={SLIDER_FPS_MAX}
        step={SLIDER_FPS_STEP}
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  )
}

export default SpeedSlider
