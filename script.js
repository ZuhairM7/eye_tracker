window.saveDataAcrossSessions = true;

const LOOK_DELAY = 100; // 1 second
const UP_CUTOFF = window.innerHeight / 4;
const DOWN_CUTOFF = window.innerHeight - window.innerHeight / 4;

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

webgazer
  .setGazeListener((data, timestamp) => {
    if (data == null || lookDirection === "STOP") return;

    if (data.y < UP_CUTOFF && lookDirection !== "UP" && lookDirection !== "RESET") {
      startLookTime = timestamp;
      lookDirection = "UP"; // When looking up, we want to scroll up
    } else if (data.y > DOWN_CUTOFF && lookDirection !== "DOWN" && lookDirection !== "RESET") {
      startLookTime = timestamp;
      lookDirection = "DOWN"; // When looking down, we want to scroll down
    } else if (data.y >= UP_CUTOFF && data.y <= DOWN_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "UP") {
        window.scrollBy({
          top: -300,
          behavior: "smooth",
        });
      } else {
        window.scrollBy({
          top: 300,
          behavior: "smooth",
        }); // Scroll down by 100 pixels
      }

      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = "STOP";
      setTimeout(() => {
        lookDirection = "RESET";
      }, 200);
    }
  })
  .begin();

webgazer.showVideoPreview(true).showPredictionPoints(false); // Display video preview
