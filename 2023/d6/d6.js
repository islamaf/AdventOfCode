import fs from "fs"

let mapping = []
fs
.readFileSync("input.input", "utf-8")
.trim()
.split("\n")
.forEach(line => {
	const split = line.split(" ")
	split.forEach(item => {
		if (item !== "" && parseInt(item) > 0) {
			mapping.push(parseInt(item))
		}
	})
})

const time = mapping.slice(0, mapping.length/2)
const distance = mapping.slice(mapping.length/2)

const partOne = () => {
	let res = []
	time.forEach((t, idx) => {
		let counter = 0
		for (let i = 0; i <= t; i++) {
			if ((t - i) * i > distance[idx] ) {
				counter++
			}
		}
		res.push(counter)
	})

	return res.reduce((a, b) => a * b)
}

console.log(partOne())

const partTwo = () => {
	const mergedTime = time.toString().replaceAll(",", "")
	const mergedDistance = distance.toString().replaceAll(",", "");

	let counter = 0
	for (let i = 0; i <= mergedTime; i++) {
		if ((mergedTime - i) * i > mergedDistance ) {
			counter++
		}
	}

	return counter
}

console.log(partTwo())
