import fs from "fs";

const data = fs.readFileSync("input.input", "utf-8").split("\n");
const numsEnum = {
  one: "on1e",
  two: "tw2o",
  three: "thr3e",
  four: "fo4ur",
  five: "fi5ve",
  six: "si6x",
  seven: "sev7en",
  eight: "ei8ght",
  nine: "ni9ne",
};
const re = new RegExp(Object.keys(numsEnum).join("|"), "g");

const joinNumbers = (arr) =>
  arr.length > 0
    ? parseInt(arr[0] + arr[arr.length - 1])
    : parseInt(arr[0] + arr[0]);

let calibrationValues = [];
data.forEach((str) => {
  const replaceWordNumbers = str.replace(re, (omatch) => numsEnum[match]);
  const x = replaceWordNumbers.replace(re, (match) => numsEnum[match])
  const numsArray = x.replace(/[^0-9]/g, "");
  calibrationValues.push(joinNumbers(numsArray));
});

console.log(calibrationValues.reduce((curr, next) => curr + next, 0));
