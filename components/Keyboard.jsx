import { clsx } from "clsx"

export default function Keyboard({ alphabet, guessedLetters, currentWord, isGameOver, onGuess }) {
  return (
    <section className="keyboard">
      {alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({ correct: isCorrect, wrong: isWrong })

        return (
          <button
            key={letter}
            className={className}
            disabled={isGameOver || isGuessed}
            aria-disabled={isGuessed}
            aria-label={`Letter ${letter}`}
            onClick={() => onGuess(letter)}
          >
            {letter.toUpperCase()}
          </button>
        )
      })}
    </section>
  )
}