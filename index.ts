import { Board } from "./src/model/Board";
import { Dictionary } from "./src/model/Dictionary";
import { BFS } from "./src/solver/BFS";
import { BoardState } from "./src/solver/BoardState";

const dictionary = await Dictionary.fromFile("src/assets/fr.txt");
console.log("Dictionary loaded:", dictionary.words.length, "words");

for (const word of dictionary.words) {
  const board = BoardState.fromEmptyBoard(
    Board.fromLetters("EALRNTSIOAEGDPLO"),
    word
  );
  const solutions = BFS(board);
  if (solutions.length > 0) {
    console.log("Word:", word, "Solutions:", solutions.length);
  }
}
