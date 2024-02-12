/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains = {};
    this.words.map((currentWord, index) => {
      const nextWord = this.words[index + 1];

      if (!chains[currentWord]) {
        chains[currentWord] = [];
      }

      if (nextWord !== undefined) {
        chains[currentWord].push(nextWord);
      } else {
        chains[currentWord].push(null);
      }
    });

    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const generatedWords = [];

    let currentWord = Object.keys(this.chains)[
      Math.floor(Math.random() * Object.keys(this.chains).length)
    ];

    for (let i = 0; i < numWords; i++) {
      generatedWords.push(currentWord);

      const nextWords = this.chains[currentWord];
      const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)]; // Step 3b

      if (nextWord === null) {
        break;
      }

      currentWord = nextWord;
    }

    const generatedText = generatedWords.join(" ");
    return generatedText;
  }
}

// Try it
console.log("Trying the machine...");
let mm = new MarkovMachine("the cat in the hat");
let txt = mm.makeText();
let txt1 = mm.makeText(50);
console.log("First generation: ", txt);
console.log("First generation: ", txt1);

module.exports = { MarkovMachine };
