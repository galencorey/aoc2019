function hasAtLeastOnePair(num) {
  const digits = String(num);
  for (let i = 0; i < digits.length - 1; i ++) {
    if (digits[i] === digits[i + 1]) {
      return true;
    }
  }
  return false;
}

function isNeverDecreasing(num) {
  const digits = String(num);
  for (let i = 0; i < digits.length -1; i ++) {
    if (Number(digits[i]) > Number(digits[i + 1])) {
      return false;
    }
  }
  return true;
}

function hasAtLeastOnePairStrict(num) {
  const digits = String(num).split('');
  let digitCounts = {}
  for (let digit of digits) {
    if (digitCounts[digit]) {
      digitCounts[digit] ++;
    } else {
      digitCounts[digit] = 1
    }
  }
  for (let digit in digitCounts) {
    if (digitCounts[digit] === 2) {
      return true;
    }
  }
   return false;
}

function getNumPasswords(min, max){
  let count = 0;
  for (let i = min; i <= max; i ++) {
    if (hasAtLeastOnePair(i) && isNeverDecreasing(i)) {
      count ++;
    }
  }

  return count;
}

function getNumPasswordsPart2(min, max){
  let count = 0;
  for (let i = min; i <= max; i ++) {
    if (hasAtLeastOnePairStrict(i) && isNeverDecreasing(i)) {
      count ++;
    }
  }

  return count;
}
console.log(getNumPasswordsPart2(359282,820401))
