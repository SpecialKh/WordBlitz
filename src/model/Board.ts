type Cells = [
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string]
];

export class Board {
  private constructor(readonly cells: Cells) {}

  static readonly fromLetters = (letters: string): Board => {
    if (letters.length !== 16) {
      throw new Error("Expected 16 letters.");
    }
    const cells = [
      [letters[0], letters[1], letters[2], letters[3]],
      [letters[4], letters[5], letters[6], letters[7]],
      [letters[8], letters[9], letters[10], letters[11]],
      [letters[12], letters[13], letters[14], letters[15]],
    ] satisfies Cells;
    return new Board(cells);
  };
}
