import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";

const run = (input, numberOfMaxValues) => {
    const inputArray = input.split('\n\n')
    let array = []
    inputArray.forEach(each => {
        const eachArray = each.split('\n').map( x => +x)
        const sum = eachArray.reduce((a, b) => a + b, 0)
        array.push(sum)
    })
    console.log("Max: ", array.reduce((a, b) => Math.max(a, b), -Infinity))
    let total = 0
    let max = 0
    for( let i = 0;  i < numberOfMaxValues; i++ ) {
        array.splice(array.indexOf(max), 1)
        max = Math.max(...array)
        total = total + max
    }
    console.log(`Max of top ${numberOfMaxValues}:`, total)
}

run(input, 3);
run(inputPersonal, 3);