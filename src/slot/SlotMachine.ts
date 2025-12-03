import { ReelSetConfig } from "./config/reelSets";
import { Reel } from "./Reel";
import { SpinStopResult, SpinWindow } from "./types";

interface PreparedReelSet {
  id: string;
  weight: number;
  reels: Reel[];
}

export class SlotMachine {
  private readonly reelSets: PreparedReelSet[];
  private readonly totalWeight: number;

  constructor(configs: ReelSetConfig[]) {
    if (!configs.length)
      throw new Error("SlotMachine must have at least one reel set");

    this.reelSets = configs.map(({ id, weight, strips }: ReelSetConfig) => {
      if (!strips.length)
        throw new Error("SlotMachine must have at least one reel");

      return {
        id,
        weight,
        reels: strips.map((strip) => new Reel(strip)),
      };
    });

    const sum = this.reelSets.reduce((acc, reelSet) => acc + reelSet.weight, 0);
    if (sum < 0) throw new Error("Total weight of all reel sets must be > 0");
    this.totalWeight = sum;
  }

  pickReelSet(): PreparedReelSet {
    const r = Math.random() * this.totalWeight;
    let accumulator = 0;

    for (const reelSet of this.reelSets) {
      accumulator += reelSet.weight;
      if (r < accumulator) return reelSet;
    }

    return this.reelSets.reduce((a, b) => (a.weight > b.weight ? a : b));
  }

  spin(): SpinStopResult {
    const chosenSet = this.pickReelSet();

    const stops: number[] = [];
    const window: SpinWindow = [];

    for (const reel of chosenSet.reels) {
      const stopIndex = reel.spin();
      stops.push(stopIndex);

      const columnSymbols = reel.getWindow(stopIndex);
      window.push(columnSymbols);
    }

    return { stops, window, reelSetId: chosenSet.id };
  }
}
