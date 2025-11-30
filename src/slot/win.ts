import { paylines } from "./paylines";
import { paytable } from "./paytable";
import { SpinWindow, SymbolID } from "./types";

export function calculateWin(window: SpinWindow): number {
  let totalWin = 0;
  const WILD = SymbolID.Wild;

  for (const line of paylines) {
    const symbols: SymbolID[] = [];

    for (let column = 0; column < window.length; column++) {
      const row = line[column];
      symbols.push(window[column][row]);
    }

    let baseSymbol: SymbolID | null = null;
    for (const symbol of symbols) {
      if (symbol !== WILD) {
        baseSymbol = symbol;
        break;
      }
    }
    if (baseSymbol === null) {
      baseSymbol = WILD;
    }

    let matchCount = 1;
    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i] === baseSymbol || symbols[i] === WILD) matchCount++;
      else break;
    }

    if (matchCount >= 3) {
      const symbolPaytable = paytable[baseSymbol];
      const symbolPaytableWin = symbolPaytable[matchCount as 3 | 4 | 5];
      totalWin += symbolPaytableWin;
    }
  }

  return totalWin;
}
