const inputData = {
  T: 2,
  testCases: [
    {
      N: 4,
      Q: 6,
      dictionary: [
        ["big", "large"],
        ["large", "huge"],
        ["small", "little"],
        ["apple", "banana"],
      ],
      queries: [
        ["same", "same"],
        ["big", "huge"],
        ["huge", "big"],
        ["apple", "peach"],
        ["big", "tall"],
        ["peach", "PEACH"],
      ],
    },
    {
      N: 5,
      Q: 2,
      dictionary: [
        ["wood", "FORest"],
        ["meadoW", "PrAirIe"],
        ["WOOD", "Lumber"],
        ["lumber", "forest"],
        ["lumber", "forest"],
      ],
      queries: [
        ["wood", "LUMBER"],
        ["mEADOw", "fire"],
      ],
    },
  ],
};

// list creation
let listOfArrays: string[][] = [];

for (let testCase = 0; testCase < inputData.T; testCase++) {
  // main run process
  loopDictionary(testCase);
  loopQueries(testCase);
  listOfArrays = [];
}

function loopDictionary(testCase: number) {
  // loop through DICTIONARY
  for (
    let indexDictionary = 0;
    indexDictionary < inputData.testCases[testCase].dictionary.length;
    indexDictionary++
  ) {
    const firstElement =
      inputData.testCases[testCase].dictionary[
        indexDictionary
      ][0].toLocaleLowerCase();
    const secondElement =
      inputData.testCases[testCase].dictionary[
        indexDictionary
      ][1].toLocaleLowerCase();

    let addPair = true;

    // Verification if elements already exist in an array
    for (let indexList = 0; indexList < listOfArrays.length; indexList++) {
      // Go through each array of the list
      for (
        let indexArray = 0;
        indexArray < listOfArrays[indexList].length;
        indexArray++
      ) {
        if (
          firstElement.toLocaleLowerCase() ===
          listOfArrays[indexList][indexArray]
        ) {
          // If firstElement is in the list look if second element is there, otherwise add it
          let secondElementNotInTheList = true;
          for (let i = 0; i < listOfArrays[indexList].length; i++) {
            if (secondElement === listOfArrays[indexList][i]) {
              secondElementNotInTheList = false;
              addPair = false;
              break; // return
            }
          }
          if (secondElementNotInTheList) {
            listOfArrays[indexList].push(secondElement.toLocaleLowerCase());
            addPair = false;
            indexList = listOfArrays.length;
            break; // return
          }
        } else if (
          secondElement.toLocaleLowerCase() ===
          listOfArrays[indexList][indexArray]
        ) {
          // If firstElement is in the list look if second element is there, otherwise add it
          let firstElementNotInTheList = true;
          for (let j = 0; j < listOfArrays[indexList].length; j++) {
            if (firstElement === listOfArrays[indexList][j]) {
              firstElementNotInTheList = false;
              addPair = false;
              break; // return
            }
          }
          if (firstElementNotInTheList) {
            listOfArrays[indexList].push(firstElement.toLocaleLowerCase());
            addPair = false;
            indexList = listOfArrays.length;
            break; // return
          }
        }
      }
    }
    if (addPair) {
      //...If both element are in no list add them to new array
      let newArray = [
        firstElement.toLocaleLowerCase(),
        secondElement.toLocaleLowerCase(),
      ];
      listOfArrays.push(newArray);
    }
  }
}

function loopQueries(testCase: number) {
  // Loop to go through queries
  for (var index in inputData.testCases[testCase].queries) {
    const firstElement =
      inputData.testCases[testCase].queries[index][0].toLowerCase();
    const secondElement =
      inputData.testCases[testCase].queries[index][1].toLowerCase();

    let different = true;

    if (
      firstElement.toLocaleLowerCase() === secondElement.toLocaleLowerCase()
    ) {
      console.log("synonyms");
    } else {
      // Verification if elements already exist in an array
      for (let indexList = 0; indexList < listOfArrays.length; indexList++) {
        // Go through each array of the list
        for (
          let indexArray = 0;
          indexArray < listOfArrays[indexList].length;
          indexArray++
        ) {
          let printed = false;
          if (
            firstElement.toLocaleLowerCase() ===
            listOfArrays[indexList][indexArray]
          ) {
            // If firstElement is in the list look if second element is there, otherwise add it
            for (let i = 0; i < listOfArrays[indexList].length; i++) {
              if (
                secondElement.toLocaleLowerCase() ===
                listOfArrays[indexList][i].toLocaleLowerCase()
              ) {
                console.log("synonyms");
                different = false;
                printed = true;
                break;
              }
            }
            if (printed) break;
          }
        }
        if (different) {
          console.log("different");
        }
        break;
      }
    }
  }
}
