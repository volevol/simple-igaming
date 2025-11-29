import { paylines } from "./paylines";
import { paytable } from "./paytable";
import { SpinWindow, SymbolID } from "./types";

export function calculateWin(window: SpinWindow): number {
  let totalWin = 0;

  for (const line of paylines) {
    const symbols: SymbolID[] = [];

    for (let column = 0; column < window.length; column++) {
      const row = line[column];
      symbols.push(window[column][row]);
    }

    const firstSymbol = symbols[0];
    let matchResult = 1;

    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i] === firstSymbol) matchResult++;
      else break;
    }

    if (matchResult >= 3) {
      const symbolPaytable = paytable[firstSymbol];
      const symbolPaytableWin = symbolPaytable[matchResult as 3 | 4 | 5];
      totalWin += symbolPaytableWin;
    }
  }

  return totalWin;
}
