import { demoReelStrips } from "./demoData";
import { SlotMachine } from "./slot/SlotMachine";
import { SpinWindow } from "./slot/types";
import { calculateWin } from "./slot/win";

const slot = new SlotMachine(demoReelStrips);

function printWindow(window: SpinWindow): void {
  const rows = 3;
  const columns = window.length;

  for (let row = 0; row < rows; row++) {
    const rowSymbols: string[] = [];
    for (let column = 0; column < columns; column++) {
      rowSymbols.push(window[column][row]);
    }
    console.log(rowSymbols.join(" | "));
  }
}

function main() {
  console.log("Simple 5x3 slot spin\n");

  const result = slot.spin();

  console.log("Stops per reel:", result.stops);
  printWindow(result.window);
  console.log(calculateWin(result.window));
}

main();
