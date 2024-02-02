import Typography from "@/component/Typography"
import useTimer from "@/hook/useTimer"

interface Props {
  isStarted: boolean
  stop: () => void
}
function Time({ isStarted, stop }: Props) {
  const { time } = useTimer(isStarted, 60, stop)
  //Todo: Add styling
  return <Typography>{time}</Typography>
}

export default Time
