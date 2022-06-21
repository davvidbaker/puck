var rpio = require("rpio");

// origin is top right square
// PIN_23 is 0, 0 (row 0, column 0)
// PIN_24 is 0, 1

/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
console.log("Opening GPIO");
const PIN_23 = 16;
const PIN_24 = 18;

const grid = [[PIN_23, PIN_24]];

grid.forEach((y) => {
  y.forEach((x) => (pin) => {
    rpio.open(grid[y][x], rpio.OUTPUT, rpio.LOW);
  });
});

const NUM_COLS = grid[0].length;
const NUM_ROWS = grid.length;

function getLight() {
  // randomly pick a row and column
  const x = Math.floor(Math.random() * NUM_COLS);
  const y = Math.floor(Math.random() * NUM_ROWS);
  return { x, y };
}

function getTimeAtSpot() {
  // 2 to 5 seconds
  return Math.random() * 3 + 2;
}

/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */

let light = getLight();
console.log("starting loop");
while (1) {
  light = getLight();

  console.log("lighting up x,y", light.x, light.y);

  grid.forEach((y) => {
    if (light.y === y) {
      y.forEach((x) => {
        if (light.x === x) {
          rpio.write(grid[y][x], rpio.HIGH);
        }
        rpio.write(grid[y][x], rpio.LOW);
      });
    } else {
      y.forEach((x) => {
        rpio.write(grid[y][x], rpio.LOW);
      });
    }
  });
  /* On for 1 second */
  // rpio.write(PIN_23, rpio.HIGH);
  rpio.sleep(getTimeAtSpot());
}
