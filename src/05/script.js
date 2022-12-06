import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";


const parseStep = (step) => {
    const retVal = step.split(' ')
    return retVal
}
const formatMatrixAndInstructions = (array) => {
    const splitMatrixAndInstructions = array.split('\n\n')
    return {matrix: formatMatrix(splitMatrixAndInstructions[0].split('\n')), instructions: splitMatrixAndInstructions[1].split('\n')}
}

const formatMatrix = (matrix) => {
    let obj = {}
    matrix.map(string => {
        const split = string.split('')
        split.map((char, i) => {
            if(!char.includes(' ') && !char.includes(']') && !char.includes('[')){
                if (obj[i]) {
                    obj[i].unshift(char)
                } else {
                    obj[i] = [char]
                }
            }
        })
    })
    return Object.values(obj)
}

const moveCrates = (matrix, instructions) => {
    instructions.forEach(step => {
        // 1 = crates, 3 = column from, 5 = column to
        const parsedStep = parseStep(step)
        for (let i = 0; i < parsedStep[1]; i++) {
            matrix[parsedStep[5] - 1].push(matrix[parsedStep[3] - 1].pop())
        }
    })
    return matrix
}

const otherMoveCrates = (matrix, instructions) => {
    instructions.forEach(step => {
        // 1 = crates, 3 = column from, 5 = column to
        const parsedStep = parseStep(step)
        const crateStack = []
        for (let i = 0; i < parsedStep[1]; i++) {
            crateStack.push(matrix[parsedStep[3] - 1].pop())
        }
        crateStack.reverse()
        matrix[parsedStep[5] - 1].push(...crateStack)
    })
    return matrix
}

const getTopCrates = (matrix) => {
    let topCrates
    matrix.forEach(row => {
        topCrates = topCrates + row.pop()
    })
    return topCrates
}

const partOne = (array) => {
    const formattedObj = formatMatrixAndInstructions(array)
    const movedCrateMatrix = moveCrates(formattedObj.matrix, formattedObj.instructions)
    return getTopCrates(movedCrateMatrix)
}

const partTwo = (array) => {
    const formattedObj = formatMatrixAndInstructions(array)
    const otherMovedCrateMatrix = otherMoveCrates(formattedObj.matrix, formattedObj.instructions)
    return getTopCrates(otherMovedCrateMatrix)
}

const testCase = "    [D]    \n" +
    "[N] [C]    \n" +
    "[Z] [M] [P]\n" +
    " 1   2   3 \n" +
    "\n" +
    "move 1 from 2 to 1\n" +
    "move 3 from 1 to 3\n" +
    "move 2 from 2 to 1\n" +
    "move 1 from 1 to 2"

const run = (array) => {
    console.log("Part One Value: ", partOne(array))
    console.log("Part Two Value: ", partTwo(array))
}

console.log("--------")
console.log("Test Case")
run(testCase);
console.log("--------")
console.log("Work Challenge")
run(input);
console.log("--------")
console.log("Personal Challenge")
run(inputPersonal);
console.log("--------")
