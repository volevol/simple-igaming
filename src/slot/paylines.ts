export const paylines: number[][] = [
  [0, 0, 0, 0, 0], // top
  [1, 1, 1, 1, 1], // middle
  [2, 2, 2, 2, 2], // bottom

  [0, 1, 2, 1, 0], // V
  [2, 1, 0, 1, 2], // V inverted

  [0, 1, 1, 1, 0], // V flat
  [2, 1, 1, 1, 2], // V flat inverted

  [1, 2, 2, 2, 1], // V flat centered
  [1, 0, 0, 0, 1], // V flat centered inverted

  [0, 2, 0, 2, 0], // W
  [2, 0, 2, 0, 2], // W inverted

  [0, 1, 0, 1, 0], // W flat
  [2, 1, 2, 1, 2], // W flat inverted

  [1, 2, 1, 2, 1], // W flat centered
  [1, 0, 1, 0, 1], // W flat centered inverted

  [0, 0, 1, 0, 0], // small V
  [1, 1, 2, 1, 1], // small V centered
  [2, 2, 1, 2, 2], // small V inverted
  [1, 1, 0, 1, 1], // small V centered inverted

  [1, 0, 1, 2, 1], // Z
  [1, 2, 1, 0, 1], // Z inverted
];
