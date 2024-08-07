import { Dictionary } from "./src/model/Dictionary";

const dictionary = await Dictionary.fromFile("src/assets/fr.txt");
console.log("Dictionary loaded:", dictionary.words.length, "words");
