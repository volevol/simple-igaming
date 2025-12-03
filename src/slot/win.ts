import { Board } from "./Board";
import { paylines } from "./paylines";
import { paytable, PaytableSymbols } from "./paytable";
import { scatterPay } from "./scatter";
import { SYMBOL_LABEL } from "./symbols";
import { SymbolID } from "./types";

export enum PayoutMode {
  Lines = "lines",
  Ways = "ways",
}

const WILD = SymbolID.Wild;
const SCATTER = SymbolID.Scatter;
const DEBUG = true; // toggle for debug

function calculateLinesWin(board: Board): number {
  let totalWin = 0;

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
      const symbolCount = (matchCount > 5 ? 5 : matchCount) as 3 | 4 | 5;
      const symbolPaytableWin = paytable[baseSymbol][symbolCount];
      totalWin += symbolPaytableWin;

      if (DEBUG)
        console.log(
          `Payline [${line}] -> "${SYMBOL_LABEL[baseSymbol]}" x ${matchCount} = ${symbolPaytableWin}`
        );
    }
  }

  return totalWin;
}

function calculateWaysWin(board: Board): number {
  let totalWin = 0;

  const paytableSymbols: PaytableSymbols[] = Object.keys(paytable).map(
    (key) => Number(key) as PaytableSymbols
  );

  for (const baseSymbol of paytableSymbols) {
    const reelMatches: number[] = [];
    const reelHasBase: boolean[] = [];

    for (let reel = 0; reel < board.width; reel++) {
      let countInReel = 0;
      let isBasePresent = false;

      for (let row = 0; row < board.height; row++) {
        const symbol = board.get(reel, row);
        if (symbol === baseSymbol) {
          countInReel++;
          isBasePresent = true;
        } else if (symbol === WILD) {
          countInReel++;
        }
      }
      reelMatches.push(countInReel);
      reelHasBase.push(isBasePresent);
    }

    let matchedReels = 0;
    let waysCount = 1;
    let isBasePresent = false;

    for (let i = 0; i < reelMatches.length; i++) {
      const count = reelMatches[i];
      if (!count) break;

      matchedReels++;
      waysCount *= count;

      if (reelHasBase[i]) isBasePresent = true;
    }

    if (matchedReels >= 3 && isBasePresent) {
      const reelCount = (matchedReels > 5 ? 5 : matchedReels) as 3 | 4 | 5;
      const symbolPaytableWin = paytable[baseSymbol][reelCount]; // pay per way
      const symbolWaysWin = symbolPaytableWin * waysCount;
      totalWin += symbolWaysWin;

      if (DEBUG)
        console.log(
          `Ways [${reelMatches}] [${reelHasBase.join(" ")}] -> "${
            SYMBOL_LABEL[baseSymbol]
          }" x ${symbolPaytableWin} x ${waysCount} = ${symbolWaysWin}`
        );
    }
  }

  return totalWin;
}

function calculateScatterWin(board: Board): number {
  let totalWin = 0;

  let scatterCount = board.countSymbol(SCATTER);

  if (scatterCount >= 3) {
    const key = scatterCount > 5 ? 5 : scatterCount;
    const payout = scatterPay[SCATTER][key as 3 | 4 | 5];
    totalWin += payout;

    if (DEBUG) console.log(`Scatter -> x ${scatterCount} = ${payout}`);
  }

  return totalWin;
}

export function calculateWin(board: Board, mode: PayoutMode): number {
  let totalWin = 0;

  if (DEBUG) console.log("\n=== Debug win info ===");

  totalWin +=
    mode === PayoutMode.Lines
      ? calculateLinesWin(board)
      : calculateWaysWin(board);

  totalWin += calculateScatterWin(board);

  return totalWin;
}
