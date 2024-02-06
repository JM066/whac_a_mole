import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
interface Props {
  mole: boolean
  updateStatus?: () => void
  deactivateMoles?: () => void
}
function Mole({ mole, updateStatus, deactivateMoles }: Props) {
  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (!mole) return
    timer.current = setTimeout(() => deactivateMoles?.(), 2000)
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [mole])

  return (
    //Todo: Add mole icons and styling
    <div className="w-20 h-20 bg-gray-100">
      <motion.div
        className="bg-green-500 cursor-pointer"
        onClick={updateStatus}
        animate={{
          x: 0,
          y: mole ? 10 : 30,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.2, ease: [0.17, 0.67, 0.83, 0.67] },
        }}
      >
        Mole
      </motion.div>
    </div>
  )
}
export default Mole
