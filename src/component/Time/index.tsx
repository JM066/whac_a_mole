import Typography from "@/component/Typography"
import useTimer from "@/hook/useTimer"

interface Props {
  isStarted: boolean
  stop: () => void
  time: number
}
function Time({ isStarted, stop, time }: Props) {
  const { timeStamp } = useTimer(isStarted, time, stop)

  //Todo: Add styling
  return <Typography>{timeStamp}</Typography>
}

export default Time
