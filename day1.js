const fs = require("fs");
const rawInput = fs.readFileSync('./day1Input.txt', 'utf8');

const inputArr = rawInput.trim().split('\n').map(Number);
const fuelMemo = new Map();

function getFuelRequirement(mass) {
  /*
  Fuel required to launch a given module is based on its mass. Specifically,
  to find the fuel required for a module, take its mass, divide by three,
  round down, and subtract 2.
  */
  return Math.floor(mass/3)-2;
}

function getFuelRequirementRecursive(mass) {
  /*
  Fuel itself requires fuel just like a module - take its mass, divide by three,
  round down, and subtract 2. However, that fuel also requires fuel, and that
  fuel requires fuel, and so on. Any mass that would require negative fuel
  should instead be treated as if it requires zero fuel; the remaining mass, if
  any, is instead handled by wishing really hard, which has no mass and is
  outside the scope of this calculation.

  So, for each module mass, calculate its fuel and add it to the total. Then,
  treat the fuel amount you just calculated as the input mass and repeat the
  process, continuing until a fuel requirement is zero or negative.
  */
  if (mass <=6) {
    return 0;
  }
  if (fuelMemo.has(mass)) {
    console.log('skipped recalculating', mass)
    return fuelMemo.get(mass);
  }

  const fuelForThisMass = getFuelRequirement(mass);
  const totalFuel = fuelForThisMass + getFuelRequirementRecursive(fuelForThisMass);
  fuelMemo.set(mass, totalFuel)
  return totalFuel;
}

function getPart1Solution(masses) {
  /*
  The Fuel Counter-Upper needs to know the total fuel requirement. To find it,
  individually calculate the fuel needed for the mass of each module (your
  puzzle input), then add together all the fuel values.
  */

  return masses.map(getFuelRequirement).reduce((total, curr) => curr + total, 0)
}



function getPart2Solution(masses) {
  return masses.map(getFuelRequirementRecursive).reduce((total, curr) => curr + total, 0)
}
console.log(getPart2Solution(inputArr))
