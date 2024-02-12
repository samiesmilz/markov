const fs = require("fs").promises;
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */
async function generateText(text) {
  const mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

/** Read file and generate text from it. */
async function makeTextFromFile(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    await generateText(data);
  } catch (err) {
    console.error(`Cannot read file: ${path}: ${err}`);
    process.exit(1);
  }
}

/** Read URL and generate text from it. */
async function makeTextFromURL(url) {
  try {
    const resp = await axios.get(url);
    await generateText(resp.data);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}

/** Interpret command line to decide what to do. */
async function main() {
  const [method, path] = process.argv.slice(2);

  switch (method) {
    case "file":
      await makeTextFromFile(path);
      break;
    case "url":
      await makeTextFromURL(path);
      break;
    default:
      console.error(`Unknown method: ${method}`);
      process.exit(1);
  }
}

main();
