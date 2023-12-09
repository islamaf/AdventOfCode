import fs from "fs"
import lcm from "compute-lcm"

const input = fs.readFileSync("input.input", "utf-8").trim().split("\n\n")
const makeDirections = (directions) => directions
	.replaceAll("L", 0)
	.replaceAll("R", 1)
	.split("")
	.map(item => parseInt(item));
const doSplit = (line) => line.replaceAll(" ", "").split("=");
const mapToObj = {}
const nodes = input[1].split("\n")
nodes.forEach(node => {
	const splitNode = doSplit(node)
	mapToObj[splitNode[0]] = splitNode[1].slice(1, -1).split(",");
})

const partOne = (start = "AAA") => {
	let numericalDirections = makeDirections(input[0])
	let inputStr = input[0]
	let steps = 0
	let currItem = start

	for (let direction of numericalDirections) {
		steps++
		const item = mapToObj[currItem][direction]

		if (item[2] === "Z") {
			break
		} else {
			currItem = item
			numericalDirections.push(inputStr[0] === "L" ? 0 : 1)
			inputStr = inputStr.slice(1) + inputStr[0]
		}
	}

	return steps
}

console.log(partOne())

const partTwo = () => {
	let currentItem = Object.keys(mapToObj).filter(key => key[2] === "A" ? key : null)

	const steps = currentItem.map(item => partOne(item))

	return lcm(steps)
}

console.log(partTwo())
