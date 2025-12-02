import { demoReelStrips } from "./demoData";
import { Board } from "./slot/Board";
import { SlotMachine } from "./slot/SlotMachine";
import { calculateWin } from "./slot/win";

interface SimulationConfig {
  spins: number;
  betPerSpin: number;
}

const slot = new SlotMachine(demoReelStrips);

function runSimulation({ spins, betPerSpin }: SimulationConfig): void {
  if (spins <= 0) throw new Error("Please provide valid positive spin count");

  const totalBet = spins * betPerSpin;
  let totalWin = 0;

  for (let i = 0; i < spins; i++) {
    const result = slot.spin();
    const board = new Board(result.window);

    const winBase = calculateWin(board);
    const winScaled = winBase * betPerSpin;

    totalWin += winScaled;
  }

  const rtp = totalWin > 0 ? (totalWin / totalBet) * 100 : 0;

  console.log("\n=== RTP Simulation Result ===");
  console.log(`Spins:        ${spins}`);
  console.log(`Bet per spin: ${betPerSpin}`);
  console.log(`Total bet:    ${totalBet}`);
  console.log(`Total win:    ${totalWin}`);
  console.log(`RTP:          ${rtp.toFixed(4)} %`);
}

runSimulation({ spins: 100000, betPerSpin: 0.5 });
