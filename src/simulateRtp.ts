import { demoReelStrips } from "./demoData";
import { SlotMachine } from "./slot/SlotMachine";
import { calculateWin } from "./slot/win";

const slot = new SlotMachine(demoReelStrips);

function runSimulation(spins: number): void {
  if (spins <= 0) {
    throw new Error("Please provide valid positive spin count");
  }

  let totalWin = 0;

  for (let i = 0; i < spins; i++) {
    const result = slot.spin();
    const win = calculateWin(result.window);

    totalWin += win;
  }

  const rtp = totalWin > 0 ? (totalWin / spins) * 100 : 0;

  console.log("\n=== RTP Simulation Result ===");
  console.log(`Spins:      ${spins}`);
  console.log(`Total bet:  ${spins}`);
  console.log(`Total win:  ${totalWin}`);
  console.log(`RTP:        ${rtp.toFixed(4)} %`);
}

runSimulation(100000);
