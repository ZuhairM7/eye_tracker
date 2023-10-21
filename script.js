window.saveDataAcrossSessions = true;

const LOOK_DELAY = 100; // 1 second
const UP_CUTOFF = window.innerHeight / 4;
const DOWN_CUTOFF = window.innerHeight - window.innerHeight / 4;

let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

let currentlyScrolling = false;

function scrollByAmount(amount, behavior = "smooth") {
  if (currentlyScrolling) {
    // Don't perform a scroll if a scroll operation is already in progress.
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
  }, 200); // Adjust the time as needed to match your scroll duration
}
webgazer
  .setGazeListener((data, timestamp) => {
    if (data == null || lookDirection === "STOP") return;

    if (data.y < UP_CUTOFF) {
      startLookTime = timestamp;
      // lookDirection = "UP"; // When looking up, we want to scroll up
      scrollByAmount(-100, "smooth");
      // window.scrollBy({
      //   top: -30,
      //   behavior: "smooth",
      // });
          // Delay for 0.2 seconds (200 milliseconds)
    // setTimeout(function() {
    //   // Your code after the delay
    //   canscroll=true;
    // }, 2000);
    } else if (data.y > DOWN_CUTOFF) {
      startLookTime = timestamp;
      // lookDirection = "DOWN"; // When looking down, we want to scroll down
      scrollByAmount(100, "smooth");
      // window.scrollBy({
      //   top: 30,
      //   behavior: "smooth",
      // });
      // setTimeout(function() {
      //   // Your code after the delay
      //   canscroll=true;
      // }, 2000);
    } else if (data.y >= UP_CUTOFF && data.y <= DOWN_CUTOFF) {
      // startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }
  })
  .begin();

webgazer.showVideoPreview(true).showPredictionPoints(true); // Display video preview
