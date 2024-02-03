import { useEffect } from "react"
import { Key } from "@/app.type"

interface Props {
  score: number
}
function Score({ score }: Props) {
  useEffect(() => {
    localStorage.setItem(Key.Score, score.toString())
    return () => {
      localStorage.removeItem(Key.Score)
    }
  }, [score])
  return <div>Score: {score}</div>
}
export default Score
