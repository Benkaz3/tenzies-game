import PropTypes from 'prop-types'
import { useEffect, useRef } from "react";
function Die(props) {

  const styles = {
    border: props.isHeld ? "5px solid grey" : "none",
  };
  const dieRef = useRef(null);

  useEffect(() => {
    if (props.isRolling && !props.isHeld) {
      const dieElement = dieRef.current;
      if (dieElement) {
        dieElement.classList.add('reRoll');
        setTimeout(() => {
          dieElement.classList.remove('reRoll');
        }, 1); // Adjust the delay to match the animation duration
      }
    }
  }, [props.isRolling, props.isHeld]);

  return (
    <div
      ref={dieRef}
      id="dice" 
      data-side={props.value}
      onClick={props.holdDice}
      >
      <div className="sides side-1" style={styles} >
        <span className="dot dot-1"></span>
      </div>
      <div className="sides side-2" style={styles}>
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
      </div>
      <div className="sides side-3" style={styles}>
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
      </div>
      <div className="sides side-4" style={styles}>
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
      </div>
      <div className="sides side-5" style={styles}>
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
      </div>
      <div className="sides side-6" style={styles}>
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
        <span className="dot dot-6"></span>
      </div>
    </div>
  );
}

Die.propTypes = {
    value: PropTypes.number,
    isHeld: PropTypes.bool,
    holdDice: PropTypes.func,
    isRolling: PropTypes.bool
  }

export default Die;
