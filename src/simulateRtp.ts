import { GameConfig } from ".";
import { demoReelStrips } from "./demoData";
import { Board } from "./slot/Board";
import { SlotMachine } from "./slot/SlotMachine";
import { calculateWin, PayoutMode } from "./slot/win";

interface SimulationConfig extends GameConfig {
  spins: number;
}

const slot = new SlotMachine(demoReelStrips);

function runSimulation({ spins, betPerSpin, mode }: SimulationConfig): void {
  if (spins <= 0) throw new Error("Please provide valid positive spin count");

  const totalBet = spins * betPerSpin;
  let totalWin = 0;

  for (let i = 0; i < spins; i++) {
    const result = slot.spin();
    const board = new Board(result.window);

    const winBase = calculateWin(board, mode);
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

runSimulation({ spins: 100000, betPerSpin: 0.5, mode: PayoutMode.Lines });
