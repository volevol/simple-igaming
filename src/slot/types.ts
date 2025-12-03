export enum SymbolID {
  Wild = 0,
  Scatter = 1,

  A = 2,
  K = 3,
  Q = 4,
  J = 5,

  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
}

export type ReelStrip = SymbolID[];

// window[reelIndex][rowIndex]
export type SpinWindow = SymbolID[][];

export interface SpinStopResult {
  stops: number[];
  window: SpinWindow;
}
