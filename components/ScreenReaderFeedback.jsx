export default function ScreenReaderFeedback({ 
    lastGuessedLetter, 
    currentWord, 
    guessedLetters, 
    numGuessesLeft 
}) {
    return (
      <section className="sr-only" aria-live="polite" role="status">
        {lastGuessedLetter && (
          <>
            <p>
              {currentWord.includes(lastGuessedLetter)
                ? `Correct! The letter ${lastGuessedLetter} is in the word.`
                : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
              You have {numGuessesLeft} attempts left.
            </p>
            <p>
              Current word: {currentWord.split("").map(letter =>
                guessedLetters.includes(letter) ? `${letter}.` : "blank."
              ).join(" ")}
            </p>
          </>
        )}
      </section>
    )
  }
  