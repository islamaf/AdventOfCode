import fs from "fs";

const input = fs
  .readFileSync("input.input", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(":"))
  .map((arr) => [
    arr[0].split(" ")[1],
    arr[1].split(";").map((subset) => {
      if (!subset.includes("blue")) {
        subset += ", 0 blue";
      }

      if (!subset.includes("green")) {
        subset += ", 0 green";
      }

      if (!subset.includes("red")) {
        subset += ", 0 red";
      }

      return subset
        .trim()
        .split(",")
        .sort((a, b) =>
          // Sort by color alphabetically
          a.trim().split(" ")[1].localeCompare(b.trim().split(" ")[1])
        )
        .map((cube) => parseInt(cube));
    }),
  ]);

// Sorted by color: blue, green, red
const requirements = [14, 13, 12];

const partOne = () => {
  let res = 0;

  input.forEach((arr) => {
    let valid = true;

    arr[1].forEach((cubes) => {
      if (
        cubes[0] > requirements[0] ||
        cubes[1] > requirements[1] ||
        cubes[2] > requirements[2]
      ) {
        if (valid) {
          valid = false;
        }
      }
    });

    if (valid) res += parseInt(arr[0]);
  });

  return res;
};

console.log(partOne());

const partTwo = () => {
  let res = 0;

  input.forEach((arr) => {
    let colors = {
      blue: 1,
      green: 1,
      red: 1,
    };

    arr[1].forEach((cubes, idx) => {
      if (cubes[0] > colors.blue) {
        colors.blue = cubes[0];
      }

      if (cubes[1] > colors.green) {
        colors.green = cubes[1];
      }

      if (cubes[2] > colors.red) {
        colors.red = cubes[2];
      }
    });

    res += Object.values(colors).reduce((s, c) => s * c);
  });

  return res;
};

console.log(partTwo());
