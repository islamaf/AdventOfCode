import fs from "fs";

const input = fs.readFileSync("input.input", "utf-8").trim().split("\n");

const isDigit = (str) => {
  return str.match(/[0-9]/);
};

const directions = (x, y) => {
  return {
    up: [x, y - 1],
    down: [x, y + 1],
    right: [x + 1, y],
    left: [x - 1, y],
    upRight: [x + 1, y - 1],
    upLeft: [x - 1, y - 1],
    downRight: [x + 1, y + 1],
    downLeft: [x - 1, y + 1],
  };
};

const isAdjacent = (x, y) => (gear) => {
  for (const val of Object.values(directions(x, y))) {
    if (input[val[1]] === undefined || input[val[1]][val[0]] === undefined)
      continue;

    if (gear) {
      if (input[val[1]][val[0]] === "*") {
        return [val[0], val[1]].toString();
      }
    } else {
      if (!input[val[1]][val[0]].match(/[0-9.]/)) {
        return true;
      }
    }
  }
};

const partOne = () => {
  let res = 0;
  input.map((line, idx) => {
    let currentNumber = "",
      adjacent = false;

    for (let i = 0; i < line.length; i++) {
      if (isDigit(line[i]) && isAdjacent(i, idx)(false)) {
        adjacent = true;
      }

      if (isDigit(line[i])) {
        currentNumber += line[i];
      }

      if (!isDigit(line[i]) || i === line.length - 1) {
        if (currentNumber.length > 0 && adjacent) {
          res += parseInt(currentNumber);
        }
        currentNumber = "";
        adjacent = false;
      }
    }
  });
  return res;
};

console.log(partOne());

const partTwo = () => {
  let res = 0;
  let gearCoordinates = {};
  input.map((line, idx) => {
    let currentNumber = "",
      currentGearCoordinates = "",
      adjacent = false;

    for (let i = 0; i < line.length; i++) {
      const checkAdjacency = isAdjacent(i, idx)(true);
      if (isDigit(line[i]) && checkAdjacency) {
        currentGearCoordinates = checkAdjacency;
        if (gearCoordinates[checkAdjacency] === undefined) {
          gearCoordinates[checkAdjacency] = [];
        }
        adjacent = true;
      }

      if (isDigit(line[i])) {
        currentNumber += line[i];
      }

      if (!isDigit(line[i]) || i === line.length - 1) {
        if (currentNumber.length > 0 && adjacent && currentGearCoordinates) {
          gearCoordinates[currentGearCoordinates].push(parseInt(currentNumber));
        }
        currentNumber = "";
        adjacent = false;
        currentGearCoordinates = "";
      }
    }
  });

  Object.keys(gearCoordinates).forEach((gear) => {
    if (typeof gear === "string" && gearCoordinates[gear].length === 2) {
      res += parseInt(gearCoordinates[gear][0] * gearCoordinates[gear][1]);
    }
  });

  return res;
};

console.log(partTwo());
