import { Board } from "./Board";
import { paylines } from "./paylines";
import { paytable, PaytableSymbols } from "./paytable";
import { scatterPay } from "./scatter";
import { SymbolID } from "./types";

export function calculateWin(board: Board): number {
  let totalWin = 0;
  const WILD = SymbolID.Wild;
  const SCATTER = SymbolID.Scatter;
  const DEBUG = true; // toggle for debug

  // --- LINES WIN ---
  for (const line of paylines) {
    const symbols: SymbolID[] = [];

    for (let column = 0; column < board.width; column++) {
      const row = line[column];
      symbols.push(board.get(column, row));
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

      if (DEBUG)
        console.log(
          `Payline [${line}] -> "${baseSymbol}" x ${matchCount} = ${symbolPaytableWin}`
        );
    }
  }

  // --- SCATTER WIN ---

  let scatterCount = board.countSymbol(SCATTER);

  if (scatterCount >= 3) {
    const key = scatterCount > 5 ? 5 : scatterCount;
    const payout = scatterPay[SCATTER][key as 3 | 4 | 5];
    totalWin += payout;

    if (DEBUG) console.log(`Scatter -> x ${scatterCount} = ${payout}`);
  }

  return totalWin;
}
