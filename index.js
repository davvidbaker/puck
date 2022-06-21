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

const NUM_COLS = grid[0].length;
const NUM_ROWS = grid.length;

for (let y = 0; y < NUM_ROWS; y++) {
  for (let x = 0; x < NUM_COLS; x++) {
    console.log("opening pin", grid[y][x]);
    rpio.open(grid[y][x], rpio.OUTPUT, rpio.LOW);
  }
}

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

  console.log(
    "lighting up x,y | pin",
    light.x,
    light.y,
    grid[light.y][light.x]
  );

  for (let y = 0; y < NUM_ROWS; y++) {
    if (light.y === y) {
      for (let x = 0; x < NUM_COLS; x++) {
        if (light.x === x) {
          console.log("🧨 going high with x,y", x, y);
          rpio.write(grid[y][x], rpio.HIGH);
        } else {
          rpio.write(grid[y][x], rpio.LOW);
        }
      }
    } else {
      for (let x = 0; x < NUM_COLS; x++) {
        rpio.write(grid[y][x], rpio.LOW);
      }
    }
  }

  const sleepFor = getTimeAtSpot();
  console.log("sleeping for", sleepFor);
  rpio.sleep(sleepFor);
}
