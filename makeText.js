/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function generateTextFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:\n  ${err}`);
      process.exit(1);
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

async function generateTextFromURL(url) {
  try {
    const res = await axios.get(url);
    let mm = new MarkovMachine(res.data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error fetching URL ${url}:\n  ${err}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: node makeText.js <file|url> <path-or-url>");
  process.exit(1);
}

const type = args[0];
const pathOrURL = args[1];

if (type === "file") {
  generateTextFromFile(pathOrURL);
} else if (type === "url") {
  generateTextFromURL(pathOrURL);
} else {
  console.error("Unknown type. Use 'file' or 'url'.");
  process.exit(1);
}

