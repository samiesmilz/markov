// Testing markov Machine chain
const { MarkovMachine } = require("./markov");

describe("Markov tests", function () {
  test("Emty input text should return an emty object", function () {
    const markov = new MarkovMachine(" ");
    expect(markov.chains).toEqual({});
  });

  test("Single-word input text should set up chains with the word mapping to null", () => {
    const markovMachine = new MarkovMachine("hello");
    expect(markovMachine.chains).toEqual({ hello: [null] });
  });
});
