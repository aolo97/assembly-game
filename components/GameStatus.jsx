import { getFarewellText } from "../utils"
import { languages } from "../languages"
import { clsx } from "clsx"

export default function GameStatus({ isGameWon, isGameLost, isLastGuessIncorrect, wrongGuessCount, isGameOver }) {
  const className = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  if (!isGameOver && isLastGuessIncorrect) {
    return (
      <section aria-live="polite" role="status" className={className}>
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1]?.name)}
        </p>
      </section>
    )
  }

  if (isGameWon) {
    return (
      <section className={className}>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
    )
  }

  if (isGameLost) {
    return (
      <section className={className}>
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </section>
    )
  }

  return null
}