import { useState, useCallback, useEffect } from "react"

interface Props {
  status: boolean
  updateStatus: () => void
}
function Mole({ status, updateStatus }: Props) {
  console.log("status", status)
  const [active, setActive] = useState<boolean>(status)

  useEffect(() => {
    setActive(status)
  }, [status])

  return (
    <div className={`${active ? "bg-green-500" : "bg-gray-500"} `} onClick={updateStatus}>
      Mole
    </div>
  )
}
export default Mole
