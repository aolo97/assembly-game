import { clsx } from "clsx"

export default function WordDisplay({ currentWord, guessedLetters, isGameLost }) {
  return (
    <section className="word">
      {currentWord.split("").map((letter, index) => {
        const shouldReveal = isGameLost || guessedLetters.includes(letter)
        const className = clsx(isGameLost && !guessedLetters.includes(letter) && "missed-letter")
        return <span key={index} className={className}>{shouldReveal ? letter.toUpperCase() : ""}</span>
      })}
    </section>
  )
}
