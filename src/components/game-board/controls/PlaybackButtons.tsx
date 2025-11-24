interface PlaybackButtonsProps {
  toggleRunning: () => void
  isRunning: boolean
  liveCellSize: number
}

const PlaybackButtons = ({
  toggleRunning,
  isRunning,
  liveCellSize,
}: PlaybackButtonsProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={toggleRunning}
        disabled={!isRunning && liveCellSize === 0}
      >
        {isRunning ? "Pause" : "Run"}
      </button>
    </div>
  )
}

export default PlaybackButtons
