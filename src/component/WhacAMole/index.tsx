import { useState } from "react"
import Moles from "@/component/Moles"
// import Mole from "@/component/Mole"
import Score from "@/component/Score"
import Time from "@/component/Time"
import Button from "@/component/Button"

function WhacAMole({ timer = 20, speed = 20, points = 2 }) {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const toggleStart = () => setIsStarted((prev) => !prev)
  const stop = () => setIsStarted(false)
  const reset = () => setScore(0)
  const addPoint = (points: number) => () => {
    setScore((prev: number) => (prev += points))
  }

  return (
    <div>
      <Score isStarted={isStarted} score={score} reset={reset} />
      <Time isStarted={isStarted} stop={stop} initialTime={timer} />
      <Button className="start" onClick={toggleStart}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      <Moles isStarted={isStarted} speed={speed} addPoint={addPoint(points)} />
    </div>
  )
}

export default WhacAMole
