import { paylines } from "./paylines";
import { paytable, PaytableSymbols } from "./paytable";
import { scatterPay } from "./scatter";
import { SpinWindow, SymbolID } from "./types";

export function calculateWin(window: SpinWindow): number {
  let totalWin = 0;
  const WILD = SymbolID.Wild;
  const SCATTER = SymbolID.Scatter;

  // --- LINES WIN ---
  for (const line of paylines) {
    const symbols: SymbolID[] = [];

    for (let column = 0; column < window.length; column++) {
      const row = line[column];
      symbols.push(window[column][row]);
    }

    let baseSymbol: PaytableSymbols | null = null;
    let hasWild = false;

    for (const symbol of symbols) {
      if (symbol === WILD) {
        hasWild = true;
        continue;
      }
      if (symbol === SCATTER) continue;

      baseSymbol = symbol as PaytableSymbols;
      break;
    }
    if (!baseSymbol) {
      if (hasWild) baseSymbol = WILD as PaytableSymbols;
      else continue;
    }

    let matchCount = 0;
    for (const symbol of symbols) {
      if (symbol === baseSymbol || symbol === WILD) matchCount++;
      else break;
    }

    if (matchCount >= 3) {
      const symbolPaytable = paytable[baseSymbol];
      const symbolPaytableWin = symbolPaytable[matchCount as 3 | 4 | 5];
      totalWin += symbolPaytableWin;
    }
  }

  // --- SCATTER WIN ---

  let scatterCount = 0;
  for (let column = 0; column < window.length; column++)
    for (let row = 0; row < window[column].length; row++)
      window[column][row] === SCATTER && scatterCount++;

  if (scatterCount >= 3) {
    const key = scatterCount > 5 ? 5 : scatterCount;
    const payout = scatterPay[SCATTER][key as 3 | 4 | 5];
    totalWin += payout;
  }

  return totalWin;
}
