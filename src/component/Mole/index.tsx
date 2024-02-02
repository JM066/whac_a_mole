import { useState, useCallback, useEffect } from "react"

interface Props {
  status: boolean
  updateStatus: () => void
  activeMole: number
}
function Mole({ status, updateStatus, activeMole }: Props) {
  console.log("status", status)
  const [active, setActive] = useState<boolean>(status)

  useEffect(() => {
    setActive(status)
  }, [status])
  // const increaseScore = useCallback(() => {
  //   if (!active) {
  //     addScore()
  //   }
  // }, [active])

  return (
    <div className={`${active ? "bg-green-500" : "bg-gray-500"} `} onClick={updateStatus}>
      Mole
    </div>
  )
}
export default Mole
