import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";

const inRange = (x, min, max) => {
    return Number(x) >= Number(min) && Number(x) <= Number(max)
}

const countFullOverlap = (elfRanges) => {
    if (inRange(elfRanges.elfOne[0], elfRanges.elfTwo[0], elfRanges.elfTwo[1]) && inRange(elfRanges.elfOne[1], elfRanges.elfTwo[0], elfRanges.elfTwo[1])) {
        return 1
    } else if (inRange(elfRanges.elfTwo[0], elfRanges.elfOne[0], elfRanges.elfOne[1]) && inRange(elfRanges.elfTwo[1], elfRanges.elfOne[0], elfRanges.elfOne[1])){
        return 1
    }
    return 0
}
const countPartialOverlap = (elfRanges) => {
    if (inRange(elfRanges.elfOne[0], elfRanges.elfTwo[0], elfRanges.elfTwo[1]) || inRange(elfRanges.elfOne[1], elfRanges.elfTwo[0], elfRanges.elfTwo[1])) {
        return 1
    } else if (inRange(elfRanges.elfTwo[0], elfRanges.elfOne[0], elfRanges.elfOne[1]) && inRange(elfRanges.elfTwo[1], elfRanges.elfOne[0], elfRanges.elfOne[1])){
        return 1
    }
    return 0
}

const getCountOfOverlappingAssignments = (elfPairs, overlapChecker) => {
    let overlappingAssignmentCount = 0
    elfPairs.map(elfPair => {
        if (elfPair.length > 1) {
            const elves = elfPair.split(",")
            const elfRanges = {
                elfOne: elves[0].split('-'),
                elfTwo: elves[1].split('-')
            }
            overlappingAssignmentCount = overlappingAssignmentCount + overlapChecker(elfRanges)
        }
    })
    return overlappingAssignmentCount
}

const partOne = (elfPairs) => {
    return getCountOfOverlappingAssignments(elfPairs, countFullOverlap)
}
const partTwo = (elfPairs) => {
    return getCountOfOverlappingAssignments(elfPairs, countPartialOverlap)
}

const testCase = "2-4,6-8\n" +
    "2-3,4-5\n" +
    "5-7,7-9\n" +
    "2-8,3-7\n" +
    "6-6,4-6\n" +
    "2-6,4-8\n"


const run = (array) => {
    const inputArray = array.split('\n')
    console.log("Part One Value: ", partOne(inputArray))
    console.log("Part Two Value: ", partTwo(inputArray))
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
