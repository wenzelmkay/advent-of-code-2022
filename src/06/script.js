import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";


const findFirstCharAfterUniqueString = (string, uniqueStringLength, startPosition) => {
    let firstCharAfterString = null
    for(let i = 0; i < string.length; i++) {
        const markerCharSet = new Set(string.slice(i, i + uniqueStringLength).split(''))
        if(markerCharSet.size === uniqueStringLength) {
            firstCharAfterString = i + uniqueStringLength
            i = string.length
        }
    }
    return firstCharAfterString
}

const partOneAndTwo = (string) => {
    let startOfPacket = findFirstCharAfterUniqueString(string, 4)
    let startOfMessage = findFirstCharAfterUniqueString(string, 14, startOfPacket)
    return [startOfPacket, startOfMessage]
}

// 10
const testCase = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"

const run = (array) => {
    console.log("Part One Value: ", partOneAndTwo(array))
}

console.log("--------")
console.log("Test Case")
run(testCase);
// console.log("--------")
// console.log("Work Challenge")
// run(input);
console.log("--------")
console.log("Personal Challenge")
run(inputPersonal);
console.log("--------")
