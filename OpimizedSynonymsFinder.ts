interface TestCase {
    N: number;
    Q: number;
    dictionary: string[][];
    queries: string[][];
  }
  
  const inputDataOptimized: { T: number, testCases: TestCase[] } = {
    T: 2,
    testCases: [
      {
        N: 4,
        Q: 6,
        dictionary: [
          ['big', 'large'],
          ['large', 'huge'],
          ['small', 'little'],
          ['apple', 'banana'],
        ],
        queries: [
          ['same', 'same'],
          ['big', 'huge'],
          ['huge', 'big'],
          ['apple', 'peach'],
          ['big', 'tall'],
          ['peach', 'PEACH'],
        ],
      },
      {
        N: 5,
        Q: 2,
        dictionary: [
          ['wood', 'FORest'],
          ['meadoW', 'PrAirIe'],
          ['WOOD', 'Lumber'],
          ['lumber', 'forest'],
          ['lumber', 'forest'],
        ],
        queries: [
          ['wood', 'LUMBER'],
          ['mEADOw', 'fire'],
        ],
      },
    ],
  };
  
  for (let testCase = 0; testCase < inputDataOptimized.T; testCase++) {
    const synonyms = new Map<string, Set<string>>();
  
    // loop through DICTIONARY
    for (let indexDictionary = 0; indexDictionary < inputDataOptimized.testCases[testCase].dictionary.length; indexDictionary++) {
      const firstElement = inputDataOptimized.testCases[testCase].dictionary[indexDictionary][0].toLowerCase();
      const secondElement = inputDataOptimized.testCases[testCase].dictionary[indexDictionary][1].toLowerCase();
  
      // if both elements are already in the map, merge the corresponding sets
      if (synonyms.has(firstElement) && synonyms.has(secondElement)) {
        const set1 = synonyms.get(firstElement)!;
        const set2 = synonyms.get(secondElement)!;
        if (set1 !== set2) {
          set1.forEach(s => set2.add(s));
          set1.forEach(s => synonyms.set(s, set2));
        }
      }
      // if only one element is in the map, add the other to its set
      else if (synonyms.has(firstElement)) {
        synonyms.get(firstElement)!.add(secondElement);
        synonyms.set(secondElement, synonyms.get(firstElement)!);
      } else if (synonyms.has(secondElement)) {
        synonyms.get(secondElement)!.add(firstElement);
        synonyms.set(firstElement, synonyms.get(secondElement)!);
      }
      // if neither element is in the map, create a new set for them
      else {
        const set = new Set<string>();
        set.add(firstElement);
        set.add(secondElement);
        synonyms.set(firstElement, set);
        synonyms.set(secondElement, set);
      }
    }
  
    // Loop to go through queries
    for (const query of inputDataOptimized.testCases[testCase].queries) {
      const firstElement = query[0].toLowerCase();
      const secondElement = query[1].toLowerCase();
  
      if (firstElement === secondElement) {
        console.log('synonyms');
      } else if (synonyms.has(firstElement) && synonyms.get(firstElement)!.has(secondElement)) {
        console.log('synonyms');
      } else {
        console.log('different');
      }
    }
  }
  