import { getWords } from "@/services/wordle.service"
import { useState, useEffect } from "react"

function Key({ letter, status }: { letter: string; status: string }) {
  return <div className={`tile ${status}`}>{letter}</div>
}

function Row({ solution, guess }: { solution: string; guess: string[] }) {
  const emptyTiles = Array.from({ length: 5 - guess.length })

  const check = ({ letter, index }: { letter: string; index: number }) => {
    if (solution[index] === letter) return "correct"
    else if (solution.includes(letter)) return "close"
    else {
      return "incorrect"
    }
  }
  return (
    <div className="line">
      {guess.map((letter, i) => (
        <Key key={i} letter={letter} status={check(letter, i)} />
      ))}
      {emptyTiles.map((_, i) => (
        <Key key={i} letter={""} status={""} />
      ))}
    </div>
  )
}
export default function Wordle() {
  const [solution, setSolution] = useState<string>("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState<string>("")

  useEffect(() => {
    fetchWords()
  }, [])

  useEffect(() => {
    let newGuesses = [...guesses]
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (currentGuess.length === 5 && guesses.length < 6) {
          newGuesses.push(currentGuess.toUpperCase())
          setCurrentGuess("")
        }
      } else if (e.key === "Backspace" || e.key === "Delete") {
        setCurrentGuess((prev) => prev.slice(0, prev.length - 1))
      } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(e.key)) {
        setCurrentGuess((prev) => prev + e.key.toUpperCase())
      }
      setGuesses(newGuesses)
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
        <Row key={i} solution={solution} guess={guess.split("")} />
      ))}
      dd
      {currentGuess && <Row solution={solution} guess={currentGuess.split("")} />}
      {Array.from({ length: 6 - guesses.length }, (_, index) => (
        <Row key={`empty-${index}`} solution={solution} guess={[]} />
      ))}
    </div>
  )
}
