const fs = require("fs");
const rawInput = fs.readFileSync('./day2Input.txt', 'utf8');

function runIntcodeProgram(arr) {
  /*
  An Intcode program is a list of integers separated by commas
  (like 1,0,0,3,99). To run one, start by looking at the first integer
  (called position 0). Here, you will find an opcode - either 1, 2, or 99.
  The opcode indicates what to do; for example, 99 means that the program is
  finished and should immediately halt. Encountering an unknown opcode means
  something went wrong.

  Opcode 1 adds together numbers read from two positions and stores the
  result in a third position. The three integers immediately after the opcode
  tell you these three positions - the first two indicate the positions from
  which you should read the input values, and the third indicates the position
  at which the output should be stored.

  For example, if your Intcode computer encounters 1,10,20,30, it should read
  the values at positions 10 and 20, add those values, and then overwrite the
  value at position 30 with their sum.

  Opcode 2 works exactly like opcode 1, except it multiplies the two inputs
  instead of adding them. Again, the three integers after the opcode indicate
  where the inputs and outputs are, not their values.

  Once you're done processing an opcode, move to the next one by stepping forward
  4 positions.
  */

  for (let i = 0; i < arr.length - 4; i += 4) {
    const opcode = arr[i]
    switch(opcode) {
      case 1:
        const sum = arr[arr[i+1]] + arr[arr[i + 2]];
        arr[arr[i + 3]] = sum;
        break;
      case 2:
        const product = arr[arr[i+1]] * arr[arr[i + 2]];
        arr[arr[i + 3]] = product;
        break;
      case 99:
        return;
      default:
        throw `Invalid opcode ${opcode} at position ${i}`
    }
  }
}

function getPart1Solution(arr){
  /*
  Once you have a working computer, the first step is to restore the gravity
  assist program (your puzzle input) to the "1202 program alarm" state it had
  just before the last computer caught fire. To do this, before running the
  program, replace position 1 with the value 12 and replace position 2 with the
  value 2. What value is left at position 0 after the program halts?
  */

  arr[1] = 12;
  arr[2] = 2;

  runIntcodeProgram(arr);
  console.log(arr[0]);
}


function getPart2Solution(arr) {

  for (let noun = 0; noun <= 99; noun ++) {
    for (let verb = 0; verb <= 99; verb ++) {
      const test = [...arr]
      test[1] = noun;
      test[2] = verb;
      try {
        runIntcodeProgram(test);
        if (test[0] === 19690720) {
          return 100 * noun + verb;
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
}
const input = rawInput.split(',').map(Number);
// getPart1Solution(input);
console.log(getPart2Solution(input))
