import PropTypes from "prop-types";
import { formatDuration } from "/src/utils";

export default function GameInfo({rolls, duration, bestTime}){
    return (
        <section className="game-info">
          <p className="rolls">Rolls: {rolls}</p>
          <p className="duration">{formatDuration(duration)}</p>
          <p className="best-time">{bestTime === Infinity ? 'Best time:' : `Best time:  ${bestTime}`}</p>
        </section>
      );
}

GameInfo.propTypes = {
  rolls: PropTypes.number,
  duration: PropTypes.number,
  bestTime: PropTypes.number,
};
