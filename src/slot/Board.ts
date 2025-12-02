import { SpinWindow, SymbolID } from "./types";

export class Board {
  private readonly window: SpinWindow;

  public readonly width: number;
  public readonly height: number;

  constructor(window: SpinWindow) {
    if (!window.length) throw new Error("Board cannot be empty");

    const height = window[0].length;

    for (const column of window)
      if (column.length !== height)
        throw new Error("All columns must have the same height");

    this.window = window;
    this.width = window.length;
    this.height = height;
  }

  get(column: number, row: number): SymbolID {
    if (column < 0 || column >= this.width)
      throw new Error("Column index out of range");

    if (row < 0 || row >= this.height)
      throw new Error("Row index out of range");

    return this.window[column][row];
  }

  countSymbol(symbol: SymbolID): number {
    let count = 0;

    for (let column = 0; column < this.width; column++)
      for (let row = 0; row < this.height; row++)
        if (this.get(column, row) === symbol) count++;

    return count;
  }
}
