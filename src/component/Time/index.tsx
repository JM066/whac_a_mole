import Typography from "@/component/Typography"
import useTimer from "@/hook/useTimer"

interface Props {
  stop: () => void
}
function Time({ stop }: Props) {
  const { remainingTime } = useTimer(stop, 60)

  return <Typography>{remainingTime}</Typography>
}

export default Time
