import { demoReelStrips } from "./demoData";
import { Board } from "./slot/Board";
import { SlotMachine } from "./slot/SlotMachine";
import { calculateWin } from "./slot/win";

interface GameConfig {
  betPerSpin: number;
}

const slot = new SlotMachine(demoReelStrips);

function printBoard(board: Board): void {
  for (let row = 0; row < board.height; row++) {
    const rowSymbols: string[] = [];

    for (let column = 0; column < board.width; column++)
      rowSymbols.push(board.get(column, row));

    console.log(rowSymbols.join(" | "));
  }
}

function main(config: GameConfig) {
  console.log("Simple 5x3 slot spin\n");

  const result = slot.spin();
  // console.log("Stops per reel:", result.stops);

  const board = new Board(result.window);
  printBoard(board);

  const winBase = calculateWin(board);
  const winScaled = winBase * config.betPerSpin;

  console.log("\n=== One spin simulation result ===");
  console.log(`Win base:     ${winBase}`);
  console.log(`Bet per spin: ${config.betPerSpin}`);
  console.log(`Win scaled:   ${winScaled}`);
}

main({ betPerSpin: 0.5 });
