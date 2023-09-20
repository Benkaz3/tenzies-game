import Confetti from "react-confetti"
import PropTypes from "prop-types"
export default function DiceContainer({tenzies, diceElements, rollDice}){
    return(
        <section className="main-wrapper">
           {tenzies && <Confetti className="confetti"/>}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button> 
        </section>
    )
}

DiceContainer.propTypes = {
    tenzies: PropTypes.bool,
    diceElements: PropTypes.array,
    rollDice: PropTypes.func
  }