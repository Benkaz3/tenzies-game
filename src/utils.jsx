import { nanoid } from "nanoid";
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function formatDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / SECONDS_IN_HOUR)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(
    (durationInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  )
    .toString()
    .padStart(2, "0");
  const seconds = (durationInSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

export {formatDuration, generateNewDie}
