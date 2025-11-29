import { Reel } from "./Reel";
import { ReelStrip, SpinStopResult, SpinWindow } from "./types";

export class SlotMachine {
  private readonly reels: Reel[];

  constructor(reelStrips: ReelStrip[]) {
    if (reelStrips.length === 0) {
      throw new Error("SlotMachine must have at least one reel");
    }

    this.reels = reelStrips.map((strip) => new Reel(strip));
  }

  spin(): SpinStopResult {
    const stops: number[] = [];
    const window: SpinWindow = [];

    for (const reel of this.reels) {
      const stopIndex = reel.spin();
      stops.push(stopIndex);

      const columnSymbols = reel.getWindow(stopIndex);
      window.push(columnSymbols);
    }

    return { stops, window };
  }
}
