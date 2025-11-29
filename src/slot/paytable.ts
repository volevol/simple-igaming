import { SymbolID } from "./types";

export const paytable: Record<SymbolID, { 3: number; 4: number; 5: number }> = {
  // HIGH TIER
  [SymbolID.A]: { 3: 10, 4: 40, 5: 200 },
  [SymbolID.K]: { 3: 8, 4: 30, 5: 160 },

  // MID TIER
  [SymbolID.Q]: { 3: 6, 4: 20, 5: 100 },
  [SymbolID.J]: { 3: 5, 4: 15, 5: 80 },

  // LOW TIER
  [SymbolID.Ten]: { 3: 3, 4: 10, 5: 50 },
  [SymbolID.Nine]: { 3: 2, 4: 8, 5: 40 },
  [SymbolID.Eight]: { 3: 2, 4: 8, 5: 40 },
  [SymbolID.Seven]: { 3: 2, 4: 8, 5: 40 },
  [SymbolID.Six]: { 3: 1, 4: 6, 5: 30 },
};
