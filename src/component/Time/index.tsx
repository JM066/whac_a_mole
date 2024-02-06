import Typography from "@/component/Typography"
import useTimer from "@/hook/useTimer"

interface Props {
  isStarted: boolean
  stop: () => void
  initialTime: number
}
function Time({ isStarted, stop, initialTime }: Props) {
  const { time } = useTimer(isStarted, initialTime, stop)

  //Todo: Add styling
  return <Typography>{time}</Typography>
}

export default Time
