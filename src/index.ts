import { SlotMachine } from "./slot/SlotMachine";
import { ReelStrip, SpinWindow, SymbolID } from "./slot/types";

const demoStrip: ReelStrip = [
  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,
];

const reelStrips: ReelStrip[] = [
  demoStrip,
  demoStrip,
  demoStrip,
  demoStrip,
  demoStrip,
];

const slot = new SlotMachine(reelStrips);

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
}

main();
