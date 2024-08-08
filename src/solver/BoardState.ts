import type { Board } from "../model/Board";

type CellPosition = [number, number];

const deductsWord = (
  cellPressed: Array<CellPosition>,
  board: Board
): string => {
  return cellPressed.map(([row, col]) => board.cells[row][col]).join("");
};

export class BoardState {
  private constructor(
    readonly board: Board,
    readonly wordSearched: string,
    readonly cellPressed: Array<CellPosition> = []
  ) {}

  static readonly fromEmptyBoard = (
    board: Board,
    wordSearched: string
  ): BoardState => {
    return new BoardState(board, wordSearched, []);
  };

  get hash(): string {
    const cellHashes = this.cellPressed.map((cell) => cell.join(",")).join(";");
    return `${this.wordSearched}#${cellHashes}`;
  }

  get isWordFound(): boolean {
    const wordPressed = deductsWord(this.cellPressed, this.board);
    return this.wordSearched === wordPressed;
  }

  nextStates = (): BoardState[] => {
    if (this.cellPressed.length === 0) {
      const [firstLetter] = this.wordSearched;
      const possibleFirstCells = this.board.cells
        .map((row, rowIndex) =>
          row.map((letter, colIndex) => [letter, rowIndex, colIndex] as const)
        )
        .flat()
        .filter(([letter]) => letter === firstLetter)
        .map(
          ([, rowIndex, colIndex]) =>
            [rowIndex, colIndex] satisfies CellPosition
        );
      return possibleFirstCells.map((cell) => this.pressCell(cell));
    }
    const lastCellPressed = this.cellPressed[this.cellPressed.length - 1];
    const [row, col] = lastCellPressed;
    const possibleMoves = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ] satisfies Array<[number, number]>;
    return possibleMoves
      .filter(([row, col]) => row >= 0 && row < 4 && col >= 0 && col < 4)
      .filter(
        (cell) =>
          !this.cellPressed.some((c) => c[0] === cell[0] && c[1] === cell[1])
      )
      .map((cell) => this.pressCell(cell))
      .filter((state) => state.isWordPossible);
  };

  private get isWordPossible(): boolean {
    const wordPressed = deductsWord(this.cellPressed, this.board);
    return this.wordSearched.startsWith(wordPressed);
  }

  private pressCell = (cell: CellPosition): BoardState => {
    const newCellPressed = [...this.cellPressed, cell];
    return new BoardState(this.board, this.wordSearched, newCellPressed);
  };
}
