import { SymbolID } from "./types";

export type PaytableSymbols = Exclude<SymbolID, SymbolID.Scatter>;

export const paytable: Record<
  PaytableSymbols,
  { 3: number; 4: number; 5: number }
> = {
  // TOP TIER
  [SymbolID.Wild]: { 3: 5, 4: 20, 5: 80 },

  // HIGH TIER
  [SymbolID.A]: { 3: 3, 4: 12, 5: 50 },
  [SymbolID.K]: { 3: 3, 4: 10, 5: 40 },

  // MID TIER
  [SymbolID.Q]: { 3: 2, 4: 8, 5: 30 },
  [SymbolID.J]: { 3: 2, 4: 6, 5: 25 },

  // LOW TIER
  [SymbolID.Six]: { 3: 1, 4: 3, 5: 10 },
  [SymbolID.Seven]: { 3: 1, 4: 3, 5: 12 },
  [SymbolID.Eight]: { 3: 1, 4: 3, 5: 12 },
  [SymbolID.Nine]: { 3: 1, 4: 3, 5: 12 },
  [SymbolID.Ten]: { 3: 1, 4: 4, 5: 15 },
};
