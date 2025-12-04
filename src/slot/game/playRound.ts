import { Board } from "../Board";
import { BONUS_SCATTER_TRIGGER, BONUS_SPINS } from "../config/bonusConfig";
import { SlotMachine } from "../SlotMachine";
import { SymbolID } from "../types";
import { calculateWin, PayoutMode } from "../win";

export interface RoundResult {
  baseWin: number;
  bonusWin: number;
  totalWin: number;
  bonusTriggered: boolean;

  baseBoard: Board;
  bonusBoards: Board[];
  bonusWins: number[];

  baseReelSetId: string;
  bonusReelSetId?: string;
}

export function playRound(
  baseSlot: SlotMachine,
  bonusSlot: SlotMachine,
  payoutMode: PayoutMode
): RoundResult {
  const baseSpin = baseSlot.spin();
  const baseBoard = new Board(baseSpin.window);

  const baseWin = calculateWin(baseBoard, payoutMode);
  const scatterCount = baseBoard.countSymbol(SymbolID.Scatter);

  const bonusTriggered = scatterCount >= BONUS_SCATTER_TRIGGER;

  let bonusWin = 0;
  const bonusBoards: Board[] = [];
  const bonusWins: number[] = [];
  let bonusReelSetId: string | undefined;

  if (bonusTriggered) {
    for (let i = 0; i < BONUS_SPINS; i++) {
      const spin = bonusSlot.spin();
      const board = new Board(spin.window);

      const win = calculateWin(board, payoutMode);
      bonusWin += win;

      bonusBoards.push(board);
      bonusWins.push(win);

      bonusReelSetId = spin.reelSetId;
    }
  }

  return {
    baseWin,
    bonusWin,
    totalWin: baseWin + bonusWin,
    bonusTriggered,

    baseBoard,
    bonusBoards,
    bonusWins,

    baseReelSetId: baseSpin.reelSetId,
    bonusReelSetId,
  };
}
