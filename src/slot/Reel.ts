import { ReelStrip, SymbolID } from "./types";

export class Reel {
  private readonly strip: ReelStrip;

  constructor(strip: ReelStrip) {
    if (strip.length === 0) {
      throw new Error("Reel strip cannot be empty");
    }
    this.strip = strip;
  }

  private normalizeIndex(index: number): number {
    const length = this.strip.length;
    return ((index % length) + length) % length;
  }

  getSymbol(index: number): SymbolID {
    const normalizedIndex = this.normalizeIndex(index);
    return this.strip[normalizedIndex];
  }

  getWindow(stopIndex: number): SymbolID[] {
    const top = this.getSymbol(stopIndex);
    const middle = this.getSymbol(stopIndex + 1);
    const bottom = this.getSymbol(stopIndex + 2);

    return [top, middle, bottom];
  }

  // stopIndex
  spin(): number {
    return Math.floor(Math.random() * this.strip.length);
  }
}
