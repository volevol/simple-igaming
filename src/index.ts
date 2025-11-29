import { Reel } from "./slot/Reel";
import { ReelStrip, SymbolID } from "./slot/types";

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

const reel = new Reel(demoStrip);

const stopIndex = reel.spin();
const windowSymbols = reel.getWindow(stopIndex);

console.log("Stop index:", stopIndex);
console.log("Window symbols:", windowSymbols);
