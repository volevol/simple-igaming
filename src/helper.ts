export function printWin(title: string, win: number, betPerSpin: number): void {
  console.log(`${title} win:`, win);

  const winScaled = win * betPerSpin;

  console.log(`${title} win scaled:`, winScaled, "\n");
}
