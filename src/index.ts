import { printWin } from "./helper";
import { Board } from "./slot/Board";
import {
  baseReelSet,
  bonusReelSet,
  volatileReelSet,
} from "./slot/config/reelSets";
import { playRound } from "./slot/game/playRound";
import { SlotMachine } from "./slot/SlotMachine";
import { SYMBOL_LABEL } from "./slot/symbols";
import { PayoutMode } from "./slot/win";

export interface GameConfig {
  betPerSpin: number;
  mode: PayoutMode;
}

// const slot = new SlotMachine([demoReelSet]);
const baseSlot = new SlotMachine([baseReelSet, volatileReelSet]);
const bonusSlot = new SlotMachine([bonusReelSet]);

function printBoard(board: Board): void {
  for (let row = 0; row < board.height; row++) {
    const rowSymbols: string[] = [];

    for (let column = 0; column < board.width; column++) {
      const symbolId = board.get(column, row);
      rowSymbols.push(SYMBOL_LABEL[symbolId]);
    }

    console.log(rowSymbols.join(" | "));
  }
}

function main({ betPerSpin, mode }: GameConfig) {
  console.log("Simple 5x3 slot spin", "\n");
  console.log("Bet per spin:", betPerSpin);

  const result = playRound(baseSlot, bonusSlot, mode);

  console.log("\n--- BASE SPIN ---");
  printBoard(result.baseBoard);
  console.log(); // '\n'
  printWin("Base", result.baseWin, betPerSpin);

  if (result.bonusTriggered) {
    console.log("\n*** BONUS TRIGGERED! ***");

    for (let i = 0; i < result.bonusBoards.length; i++) {
      console.log(`\n--- BONUS SPIN ${i + 1} ---`);

      printBoard(result.bonusBoards[i]);
      printWin("Bonus", result.bonusWins[i], betPerSpin);
    }
    printWin("Total bonus", result.bonusWin, betPerSpin);
  }
  printWin("Total", result.totalWin, betPerSpin);
}

main({ betPerSpin: 0.5, mode: PayoutMode.Ways });
