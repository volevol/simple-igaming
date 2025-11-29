import { ReelStrip, SymbolID } from "./slot/types";

export const demoStrip: ReelStrip = [
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

export const demoReelStrips: ReelStrip[] = [
  demoStrip,
  demoStrip,
  demoStrip,
  demoStrip,
  demoStrip,
];
