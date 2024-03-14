import { getWords } from "@/services/wordle.service"
import { useState, useEffect } from "react"
import Word from "@/component/Word"

function Wordle() {
  const [solution, setSolution] = useState<string>("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState<string>("")

  useEffect(() => {
    fetchWords()
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      setCurrentGuess((prev: string) => {
        if (e.key === "Enter" && currentGuess.length === 5 && guesses.length < 6) {
          setGuesses((prev) => {
            let newGuesses = [...prev]
            newGuesses.push(currentGuess.toUpperCase())
            return newGuesses
          })
          return ""
        } else if (e.key === "Backspace" || e.key === "Delete") {
          return prev.slice(0, -1)
        } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(e.key)) {
          return prev + e.key.toUpperCase()
        }
        return prev
      })
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [currentGuess, guesses])

  const fetchWords = async () => {
    try {
      const words = await getWords()
      setSolution(words[Math.floor(Math.random() * words.length)])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="board">
      {guesses.map((guess, i) => (
        <Word key={i} solution={solution} guess={guess} isSubmitted={true} />
      ))}
      {guesses.length < 6 && <Word solution={solution} guess={currentGuess} isSubmitted={false} />}
      {Array.from({ length: 5 - guesses.length }, (_, index) => (
        <Word key={`empty-${index}`} solution={solution} guess="" isSubmitted={false} />
      ))}
    </div>
  )
}
export default Wordle
