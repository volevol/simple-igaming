export enum SymbolID {
  Wild = "W",
  A = "A",
  K = "K",
  Q = "Q",
  J = "J",
  Ten = "10",
  Nine = "9",
  Eight = "8",
  Seven = "7",
  Six = "6",
}

export type ReelStrip = SymbolID[];

// window[reelIndex][rowIndex]
export type SpinWindow = SymbolID[][];

export interface SpinStopResult {
  stops: number[];
  window: SpinWindow;
}
