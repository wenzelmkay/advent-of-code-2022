import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won
// rock/scissors, scissors/paper, paper/rock

// second half
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win


const winConditions = {
    draw: ["A X", "B Y", "C Z"],
    lose: ["A Z", "C Y", "B X"],
    win: ["C X", "B Z", "A Y"],
}

const points = {
    "X": 1,
    "Y": 2,
    "Z": 3,
    "win": 6,
    "draw": 3
}


const winConditionsSecond = {
    "X": "lose",
    "Y": "draw",
    "Z": "win",
}

const firstHalf = (inputArray) => {
    let score = 0
    inputArray.map(match => {
        if(winConditions.draw.includes(match)) {
            score = score + points.draw
        } else if( winConditions.win.includes(match)) {
            score = score + points.win
        }

        const myHand = match.split(' ')[1]
        score = score + points[myHand]
    })
    return score
}

const secondHalf = (inputArray) => {
    let score = 0
    let matchMovesArray = []
    inputArray.map(match => {
        const opponentHand = match.split(' ')[0]
        const matchOutcome = match.split(' ')[1]
        const matchOutcomeCondition = winConditionsSecond[matchOutcome]
        winConditions[matchOutcomeCondition].map(condition => {
            if (condition.includes(opponentHand)) {
                matchMovesArray.push(condition)
            }
        })
    })
    score = firstHalf(matchMovesArray)
    return score
}

const run = (input) => {
    const inputArray = input.split('\n')
    const firstHalfScore = firstHalf(inputArray)
    const secondHalfScore = secondHalf(inputArray)
    console.log("First Half Score: ", firstHalfScore)
    console.log("Second Half Score: ", secondHalfScore)
}

// run(input);
run(inputPersonal);
