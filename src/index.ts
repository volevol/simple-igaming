import { demoReelStrips } from "./demoData";
import { Board } from "./slot/Board";
import { SlotMachine } from "./slot/SlotMachine";
import { calculateWin } from "./slot/win";

const slot = new SlotMachine(demoReelStrips);

function printBoard(board: Board): void {
  for (let row = 0; row < board.height; row++) {
    const rowSymbols: string[] = [];

    for (let column = 0; column < board.width; column++)
      rowSymbols.push(board.get(column, row));

    console.log(rowSymbols.join(" | "));
  }
}

function main() {
  console.log("Simple 5x3 slot spin\n");

  const result = slot.spin();
  // console.log("Stops per reel:", result.stops);

  const board = new Board(result.window);
  printBoard(board);

  const totalWin = calculateWin(board);
  console.log(`Total win: ${totalWin}`);
}

main();
