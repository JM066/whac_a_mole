import Letter from "../Letter"

interface Props {
  solution: string
  guess: string
  isSubmitted: boolean
}

function Word(props: Props) {
  const { solution, guess, isSubmitted } = props

  const emptyTiles = Array.from({ length: 5 - guess.length })

  const check = (letter: string, index: number) => {
    if (!isSubmitted) return ""
    if (solution[index] === letter) return "correct"
    else if (solution.includes(letter)) return "close"
    else {
      return "incorrect"
    }
  }

  return (
    <div className="line">
      {guess?.split("").map((letter, i) => {
        const status = check(letter, i)
        return <Letter key={i} letter={letter} status={status} />
      })}
      {emptyTiles.map((_, i) => (
        <Letter key={i} letter={""} status={""} />
      ))}
    </div>
  )
}

export default Word
