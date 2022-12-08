import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";

const totalFilesizes = (string) => {
    const arrayOfOutput = string.split("\n")
    let outputObj = {'root': 0}
    let dirStack = ['root']
    let finalPops = 0
    arrayOfOutput.map((output, i) => {
        if (output.substring(0,4) === "$ cd" ) {
            const moveInOrOut = output.substring(5)
            if (moveInOrOut !== '/' && moveInOrOut !== '..') {
                dirStack.push(moveInOrOut)
                let objKey = dirStack.join('/')
                if (!Object.keys(outputObj).includes(objKey)) {
                    outputObj[objKey] = 0
                }
                finalPops++
            } else if (moveInOrOut === '..') {
                const currentDir = dirStack.join('/')
                dirStack.pop()
                const nextDir = dirStack.join('/')
                outputObj[nextDir] = outputObj[nextDir] + outputObj[currentDir]
                finalPops--
            }
        } else if (output.substring(0,4) === "$ ls") {
            // do nothing
        } else if (output.substring(0,3) === "dir") {
            // do nothing
        } else if (output[0].toUpperCase() === output[0].toLowerCase() ) {
            let objKey = dirStack.join('/')
            const fileSize = output.substring(0, output.indexOf(' '))
            outputObj[objKey] = outputObj[objKey] + Number(fileSize)
        }
    })
    while(finalPops > 0) {
        const currentDir = dirStack.join('/')
        dirStack.pop()
        const nextDir = dirStack.join('/')
        outputObj[nextDir] = outputObj[nextDir] + outputObj[currentDir]
        finalPops--
    }

    return outputObj
}

const partOne = (array) => {
    const obj = totalFilesizes(array)
    const totalOfFileSizesThanHundoThou = (Object.values(obj)).filter((value) => value <= 100000)
        .reduce((sum, value) => sum + value)
    return totalOfFileSizesThanHundoThou
}

const partTwo = (array) => {
    const obj = totalFilesizes(array)
    const availableSpace = 70000000
    const requiredSpace = 30000000
    const currentlyTakenSpace = obj.root
    const currentUnusedSpace = availableSpace - currentlyTakenSpace
    const amountNeedToDelete = requiredSpace - currentUnusedSpace
    const fileSizeToDelete = Math.min(...(Object.values(obj)).filter((value) => value >= amountNeedToDelete))
    return fileSizeToDelete
}

// 10
const testCase = "$ cd /\n" +
    "$ ls\n" +
    "dir a\n" +
    "14848514 b.txt\n" +
    "8504156 c.dat\n" +
    "dir d\n" +
    "$ cd a\n" +
    "$ ls\n" +
    "dir e\n" +
    "29116 f\n" +
    "2557 g\n" +
    "62596 h.lst\n" +
    "$ cd e\n" +
    "$ ls\n" +
    "584 i\n" +
    "$ cd ..\n" +
    "$ cd ..\n" +
    "$ cd d\n" +
    "$ ls\n" +
    "4060174 j\n" +
    "8033020 d.log\n" +
    "5626152 d.ext\n" +
    "7214296 k"

const run = (array) => {
    console.log("Part One Value: ", partOne(array))
    console.log("Part Two Value: ", partTwo(array))
}

console.log("--------")
console.log("Test Case")
run(testCase);
console.log("--------")
// console.log("Work Challenge")
// run(input);
// console.log("--------")
console.log("Personal Challenge")
run(inputPersonal);
console.log("--------")
