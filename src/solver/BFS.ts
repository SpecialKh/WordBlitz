import type { BoardState } from "./BoardState";

export const BFS = (boardState: BoardState) => {
  const Q = [];
  const explored = new Set<string>();
  Q.push(boardState);
  explored.add(boardState.hash);
  const solutions: BoardState[] = [];
  while (Q.length > 0) {
    const v = Q.shift() as BoardState;
    if (v.isWordFound) {
      solutions.push(v);
    }
    for (const w of v.nextStates()) {
      if (!explored.has(w.hash)) {
        explored.add(w.hash);
        Q.push(w);
      }
    }
  }
  return solutions;
};
