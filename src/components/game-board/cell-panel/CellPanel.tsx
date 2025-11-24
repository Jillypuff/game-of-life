interface CellPanelProps {
  resetCells: () => void
  isRunning: boolean
}

const CellPanel = ({ resetCells, isRunning }: CellPanelProps) => {
  return (
    <div>
      <div>
        <button type="button" onClick={isRunning ? () => {} : resetCells}>
          Reset Cells
        </button>
      </div>
    </div>
  )
}

export default CellPanel
