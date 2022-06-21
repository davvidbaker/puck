var rpio = require('rpio');

console.log('hello world');

/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
rpio.open(16, rpio.OUTPUT, rpio.HIGH);

/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */
while(1) {
        /* On for 1 second */
console.log('high');
        rpio.write(16, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
console.log('low');
        rpio.write(16, rpio.LOW);
        rpio.msleep(500);
}
