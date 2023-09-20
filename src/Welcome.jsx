import PropTypes from "prop-types";
import diceImg from "/src/assets/die.svg"
export default function Welcome(props) {

  return (
    <section className="welcome-section">
      {/* <h1 className="title">Tenzies</h1>
      <h4>
        Roll until all dice are the same. <br />
        Click each die to freeze it at its current value between rolls.
      </h4> */}
      <img src={diceImg} className="dice-img" />
      <p className="welcome-instrucitons">
        Roll until all dice are the same. <br />
        Click each die to freeze it at its current value between rolls.
      </p> 
      <button className="start-btn" onClick={props.onClick}>
        Start Game
      </button>
    
    </section>
  );
}

Welcome.propTypes = {
  onClick: PropTypes.func,
};
