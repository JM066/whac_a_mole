import { useEffect, useRef, memo, useState } from "react"
import { motion } from "framer-motion"

interface Props {
  isStarted: boolean
  initialMole: boolean
  speed: number
  addPoint: () => void
}
function Mole({ isStarted, initialMole, speed, addPoint }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const [mole, setMole] = useState<boolean>(initialMole)

  useEffect(() => {
    if (!isStarted) {
      setMole(false)
    }
  }, [isStarted])

  useEffect(() => {
    if (isStarted) {
      const random = Math.floor(Math.random() * speed)
      timer.current = setTimeout(popUp, random * 1000)
    } else {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = undefined
      }
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [isStarted])

  const popUp = () => {
    setMole(true)
  }
  useEffect(() => {
    if (mole) {
      const random = Math.floor(Math.random() * 2 + 4)
      timer.current = setTimeout(hide, random * 1000)
    } else {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = undefined
      }
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [mole])

  const hide = () => setMole(false)

  const whack = () => {
    if (!mole) return
    setMole(false)
    addPoint()
  }
  return (
    //Todo: Add mole icons and styling
    <div className="w-20 h-20 bg-gray-100">
      <motion.div
        className="bg-green-500 cursor-pointer"
        onClick={whack}
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
export default memo(Mole)
