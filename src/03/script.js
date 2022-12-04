import {input} from "./input.js";
import {inputPersonal} from "./inputPersonal.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz"

const getItemPriority = (item) => {
    let itemPriority = 0
    itemPriority = alphabet.indexOf(item) + 1
    if (itemPriority === 0) {
        itemPriority = alphabet.indexOf(item.toLowerCase()) + 27
    }
    return itemPriority
}

const findDuplicateItems = (array1, array2) => {
    let duplicateItems = []
    array1.forEach(item => {
        if (array2.includes(item) && !duplicateItems.includes(item)) {
            duplicateItems.push(item)
        }
    })
    return duplicateItems
}

const findTheMisplacedItemSum = (rucksackItemsSplitByElf) => {
    let itemPrioritySum = 0
    rucksackItemsSplitByElf.map(rucksack => {
        console.log("Rucksack: ", rucksack)
        if(rucksack.length % 2 === 0) {
            const rucksackCompartments = {
                compartmentOne: (rucksack.slice(0, rucksack.length/2)).split(''),
                compartmentTwo: (rucksack.slice(rucksack.length/2)).split('')
            }
            // console.log(rucksackCompartments)
            let misplacedItems = []
            misplacedItems = [...findDuplicateItems(rucksackCompartments.compartmentOne, rucksackCompartments.compartmentTwo)]
            if(misplacedItems.length !== 1){
                misplacedItems = [...findDuplicateItems(rucksackCompartments.compartmentTwo, rucksackCompartments.compartmentOne)]
            }
            if(misplacedItems.length !== 1){
                console.log("Uh-oh")
                console.log(rucksack)
                console.log(rucksackCompartments)
            }

            itemPrioritySum = itemPrioritySum + getItemPriority(misplacedItems[0])
        }
    })
    return itemPrioritySum
}

const getElfSquads = (rucksackItemsSplitByElf) => {
    let elfSquads = {}
    if (rucksackItemsSplitByElf.length % 3 > 0) {
        console.log("We gotta problem here boss.")
    } else {
        let copyOfRucksacks = rucksackItemsSplitByElf
        while (copyOfRucksacks.length > 0) {
            const squadName = `squad${Object.keys(elfSquads).length + 1}`
            elfSquads[squadName] = [copyOfRucksacks[0], copyOfRucksacks[1], copyOfRucksacks[2]]
            copyOfRucksacks = copyOfRucksacks.slice(3)
        }
    }
    // console.log(elfSquads)
    return elfSquads
}

const findTheBadgePrioritySum = (rucksackItemsSplitByElf) => {
    const elfSquads = getElfSquads(rucksackItemsSplitByElf)
    let badgeItemsPrioritySum = 0
    for (const squad in elfSquads) {
        let commonItems = []
        commonItems = [...findDuplicateItems(elfSquads[squad][0].split(''), elfSquads[squad][1].split('') )]
        commonItems = [...findDuplicateItems(commonItems, elfSquads[squad][2].split(''))]
        if (commonItems.length !== 1) {
            console.log("We gotta problem here boss.")
        } else {
            badgeItemsPrioritySum = badgeItemsPrioritySum + getItemPriority(commonItems[0])
        }
    }
   return badgeItemsPrioritySum
}

const testCase = "vJrwpWtwJgWrhcsFMMfFFhFp\n" +
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n" +
    "PmmdzqPrVvPwwTWBwg\n" +
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n" +
    "ttgJtRGJQctTZtZT\n" +
    "CrZsJsPPZsGzwwsLwLmpwMDw"


const run = (rucksackItems) => {
    const rucksackItemsSplitByElf = rucksackItems.split('\n')
    console.log("Item Priority Sum: ", findTheMisplacedItemSum(rucksackItemsSplitByElf))
    console.log("Badge Priority Sum: ", findTheBadgePrioritySum(rucksackItemsSplitByElf))
}

// run(testCase);
run(input);
// run(inputPersonal);
