window.saveDataAcrossSessions = true;

const LOOK_DELAY = 100; // 1 second
const UP_CUTOFF = window.innerHeight / 5;
const DOWN_CUTOFF = window.innerHeight - window.innerHeight / 5;

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

let currentlyScrolling = false;

function scrollByAmount(amount, behavior = "smooth") {
  if (currentlyScrolling) {
    return;
  }

  currentlyScrolling = true;

  // Scroll the window by the specified amount
  window.scrollBy({
    top: amount,
    behavior: behavior,
  });

  // After scrolling is complete, set currentlyScrolling to false
  setTimeout(() => {
    currentlyScrolling = false;
  }, LOOK_DELAY); // Adjust the time as needed to match your scroll duration
}
webgazer
  .setGazeListener((data, timestamp) => {
    if (data == null || lookDirection === "STOP") return;

    if (data.y < UP_CUTOFF) {
      startLookTime = timestamp;
      scrollByAmount(-8, "smooth");
    } else if (data.y > DOWN_CUTOFF) {
      startLookTime = timestamp;
      scrollByAmount(8, "smooth");
    }
  }).begin();

webgazer.showVideoPreview(true).showPredictionPoints(true); // Display video preview