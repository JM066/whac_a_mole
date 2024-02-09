import Mole from "@/component/Mole"

const GAMEBOARD_ROWS = [
  [0, 1],
  [2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22],
  [23, 24, 25, 26],
  [27, 28],
]
const moles = Array(29).fill(false)

interface Props {
  isStarted: boolean
  speed: number
  addPoint: () => void
}
function Moles({ isStarted, ...rest }: Props) {
  return (
    <div>
      {GAMEBOARD_ROWS.map((row, idx) => (
        <div key={`row-${idx}`} className="row">
          {row.map((col) => (
            <Mole key={`col-${col}`} isStarted={isStarted} initialMole={moles[col]} {...rest} />
          ))}
        </div>
      ))}
    </div>
  )
}
export default Moles
