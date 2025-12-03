import { ReelSetConfig } from "./slot/config/reelSets";
import { ReelStrip, SymbolID } from "./slot/types";

export const demoStrip: ReelStrip = [
  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Scatter, // SCATTER
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.Wild, // WILD
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Scatter, // SCATTER
  SymbolID.Nine,
  SymbolID.Wild, // WILD
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Scatter, // SCATTER
  SymbolID.Six,
  SymbolID.Wild, // WILD

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Scatter, // SCATTER
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.Scatter, // SCATTER
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Scatter, // SCATTER
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.Wild, // WILD
  SymbolID.Wild, // WILD
  SymbolID.A,
  SymbolID.Wild, // WILD
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Scatter, // SCATTER
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Wild, // WILD
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Scatter, // SCATTER
  SymbolID.Six,

  SymbolID.A,
  SymbolID.Scatter, // SCATTER
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Wild, // WILD
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.K,
  SymbolID.Q,
  SymbolID.Wild, // WILD
  SymbolID.Wild, // WILD
  SymbolID.J,
  SymbolID.Ten,
  SymbolID.Scatter, // SCATTER
  SymbolID.Nine,
  SymbolID.Eight,
  SymbolID.Seven,
  SymbolID.Six,

  SymbolID.A,
  SymbolID.Wild, // WILD
  SymbolID.K,
  SymbolID.Q,
  SymbolID.J,
  SymbolID.Scatter, // SCATTER
  SymbolID.Ten,
  SymbolID.Nine,
  SymbolID.Scatter, // SCATTER
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

export const demoReelSet: ReelSetConfig = {
  id: "demo",
  weight: 100,
  strips: demoReelStrips,
};
