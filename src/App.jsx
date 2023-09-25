import { useState, useEffect } from "react";
import Die from "/src/Die";
import "./App.css";
import Welcome from "/src/Welcome";
import DiceContainer from "/src/DiceContainer";
import GameInfo from "/src/GameInfo";
import { generateNewDie } from "/src/utils";

function App() {
  const diceCount = 6;
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [bestTime, setBestTime] = useState(
    parseInt(localStorage.getItem("bestTime")) || Infinity
  );
  const [error, setError] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  function startGame() {
    setShowWelcome(false);
    setRolls(0);
    setDuration(0);
    setStartTime(Date.now());
    setEndTime(null);
  }

  /**
   * Function to handle the roll of the dice in the game.
   * If the game has not been won (tenzies), it generates new dice values for the dice that are not held,
   * increments the roll count, and updates the state accordingly.
   * If the game has been won (tenzies), it resets the game state, including tenzies status, duration, roll count,
   * and starts a new game by generating new dice values.
   *
   * Game Logic:
   * - If the game has not been won (tenzies = false):
   *   - Generate new dice values for the dice that are not held by calling generateNewDie().
   *   - Increment the roll count by 1.
   *   - Update the state with the new dice values and the updated roll count.
   * - If the game has been won (tenzies = true):
   *   - Reset the tenzies status to false.
   *   - Record the duration of the game by logging it to the console (for debugging purposes).
   *   - If the current duration is less than the best time, update the best time and store it in localStorage.
   *   - Reset the duration to 0, rolls to 0, and start time to the current time.
   *   - Generate new dice values for a new game by calling allNewDice().
   */
  function rollDice() {
    try {
      if (!tenzies) {
        setIsRolling(true);
        setDice((oldDice) =>
          oldDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
        );
        setRolls(prevRolls => prevRolls + 1);
  
        // After rolling is complete toggle off the rolling effect
        setTimeout(() => {
          setIsRolling(false);
        }, 1000); 

      } else {
        setTenzies(false);
        if (duration < bestTime) {
          setBestTime(duration);
          localStorage.setItem("bestTime", duration.toString());
        }
        setDuration(0);
        setRolls(0);
        setStartTime(Date.now());
        setDice(allNewDice());
      }
    } catch (error) {
      setError("An error occurred during dice roll. Please try again.");
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      isRolling={isRolling}
    />
  ));
  /** Effect hook to check for winning conditions: all dice are held && have the same value */
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  /**
   * Effect hook to update the duration of the game.
   * It starts a timer that updates the duration every second (1000ms) if the game has started
   * (startTime is set) and has not ended (endTime is not set) and tenzies is not achieved.
   * When the effect is cleaned up (component unmounts or dependencies change),
   * it clears the timer to prevent memory leaks.
   *
   * Effect Logic:
   * - On dependency change (startTime, endTime, tenzies):
   *   - If the game has started (startTime is set), has not ended (endTime is not set),
   *     and tenzies is not achieved:
   *     - Start a timer using setInterval that updates the duration every second.
   *     - Calculate the elapsed seconds by subtracting the current time from the start time.
   *     - Update the duration state with the elapsed seconds.
   * - On effect cleanup (component unmounts or dependencies change):
   *   - Clear the timer to prevent memory leaks.
   */
  useEffect(() => {
    let timerId;
    try {
      if (startTime && !endTime && !tenzies) {
        timerId = setInterval(() => {
          const currentTime = Date.now();
          const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
          setDuration(elapsedSeconds);
        }, 1000);
      }
    } catch (error) {
      setError("An error occurred in the timer. Please try again.");
    }

    return () => {
      clearInterval(timerId);
    };
  }, [startTime, endTime, tenzies]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < diceCount; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  return (
    <main>
      {showWelcome ? (
        <Welcome onClick={startGame} />
      ) : (
        <>
          <DiceContainer
            tenzies={tenzies}
            diceElements={diceElements}
            rollDice={rollDice}
          />
          <GameInfo rolls={rolls} duration={duration} bestTime={bestTime} />
          {error && <p>{error}</p>}
        </>
      )}
    </main>
  );
}

export default App;
