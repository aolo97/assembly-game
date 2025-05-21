import { useState, useEffect } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"
import Confetti from "react-confetti"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import WordDisplay from "./components/WordDisplay"
import Keyboard from "./components/Keyboard"
import ScreenReaderFeedback from "./components/ScreenreaderFeedback"

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(l => !currentWord.includes(l)).length
  const numGuessesLeft = languages.length - 1 - wrongGuessCount
  const isGameWon = currentWord.split("").every(l => guessedLetters.includes(l))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    if (isGameOver) return
    setGuessedLetters(prev => (prev.includes(letter) ? prev : [...prev, letter]))
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  useEffect(() => {
    function handleKeyPress(e) {
      const letter = e.key.toLowerCase()
      if (alphabet.includes(letter) && !guessedLetters.includes(letter)) {
        addGuessedLetter(letter)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [guessedLetters, isGameOver])

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}

      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessIncorrect={isLastGuessIncorrect}
        isGameOver={isGameOver}
        wrongGuessCount={wrongGuessCount}
      />

      <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />

      <WordDisplay
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      <ScreenReaderFeedback
        lastGuessedLetter={lastGuessedLetter}
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        numGuessesLeft={numGuessesLeft}
      />

      <Keyboard
        alphabet={alphabet}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        isGameOver={isGameOver}
        onGuess={addGuessedLetter}
      />

      {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
    </main>
  )
}
