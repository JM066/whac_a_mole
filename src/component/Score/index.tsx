import { useEffect } from "react"

interface Props {
  isStarted: boolean
  score: number
  reset: () => void
}
function Score({ isStarted, score, reset }: Props) {
  useEffect(() => {
    if (isStarted) {
      reset()
    }
  }, [isStarted])
  return <div>Score: {score}</div>
}
export default Score
