import fs from "fs";

const input = fs
  .readFileSync("input.input", "utf-8")
  .split("\n")
  .map((line) => line.split(":")[1].split("|"));

const findIntersection = (leftSide, rightSide) => {
  return leftSide
    .trim()
    .split(" ")
    .filter((element) => rightSide.trim().split(" ").includes(element));
};

const partOne = () => {
  let total = 0;
  input.forEach((line) => {
    let res = 0,
      initial = true;
    const intersection = findIntersection(line[0], line[1]);
    intersection
      .filter((item) => item !== "")
      .forEach((_) => {
        if (initial) {
          res++;
          initial = false;
        } else {
          res *= 2;
        }
      });

    total += res;
  });

  return total;
};

console.log(partOne());

const partTwo = () => {
  let copies = {};
  input.forEach((line, idx) => {
    const intersection = findIntersection(line[0], line[1]);

    copies[idx + 1] = copies[idx + 1] || { instances: 0, matches: [] };
    copies[idx + 1].instances++;

    const matches = intersection
      .filter((item) => item !== "")
      .map((_, sidx) => sidx + 1 + idx + 1);

    copies[idx + 1].matches = [...copies[idx + 1].matches, ...matches];
  });

  Object.keys(copies).forEach((copy) => {
    copies[copy].matches.forEach((match) => {
      copies[match.toString()].instances += copies[copy].instances;
    });
  });

  const sum = Object.keys(copies).reduce((accumulator, copy) => {
    return accumulator + parseInt(copies[copy].instances);
  }, 0);

  return sum;
};

console.log(partTwo());
