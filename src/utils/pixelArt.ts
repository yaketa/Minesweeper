import type { PixelArt, PixelColor } from '../types';

// _ = 地雷（背景）, 色文字 = 安全セル
const _ = null;
const R = '#ff4444'; // Red
const W = '#ffffff'; // White
const B = '#000000'; // Black
const Y = '#ffcc00'; // Yellow

// ハートのドット絵 (10x10)
const heartPixels: PixelColor[][] = [
  [_, _, R, R, _, _, R, R, _, _],
  [_, R, R, R, R, R, R, R, R, _],
  [R, R, R, R, R, R, R, R, R, R],
  [R, R, R, R, R, R, R, R, R, R],
  [R, R, R, R, R, R, R, R, R, R],
  [_, R, R, R, R, R, R, R, R, _],
  [_, _, R, R, R, R, R, R, _, _],
  [_, _, _, R, R, R, R, _, _, _],
  [_, _, _, _, R, R, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _],
];

// 星のドット絵 (10x10)
const starPixels: PixelColor[][] = [
  [_, _, _, _, Y, Y, _, _, _, _],
  [_, _, _, _, Y, Y, _, _, _, _],
  [_, _, _, Y, Y, Y, Y, _, _, _],
  [Y, Y, Y, Y, Y, Y, Y, Y, Y, Y],
  [_, Y, Y, Y, Y, Y, Y, Y, Y, _],
  [_, _, Y, Y, Y, Y, Y, Y, _, _],
  [_, _, Y, Y, Y, Y, Y, Y, _, _],
  [_, Y, Y, Y, _, _, Y, Y, Y, _],
  [_, Y, Y, _, _, _, _, Y, Y, _],
  [Y, Y, _, _, _, _, _, _, Y, Y],
];

// スマイルのドット絵 (10x10)
const smilePixels: PixelColor[][] = [
  [_, _, Y, Y, Y, Y, Y, Y, _, _],
  [_, Y, Y, Y, Y, Y, Y, Y, Y, _],
  [Y, Y, Y, B, Y, Y, B, Y, Y, Y],
  [Y, Y, Y, B, Y, Y, B, Y, Y, Y],
  [Y, Y, Y, Y, Y, Y, Y, Y, Y, Y],
  [Y, Y, Y, Y, Y, Y, Y, Y, Y, Y],
  [Y, Y, B, Y, Y, Y, Y, B, Y, Y],
  [Y, Y, Y, B, B, B, B, Y, Y, Y],
  [_, Y, Y, Y, Y, Y, Y, Y, Y, _],
  [_, _, Y, Y, Y, Y, Y, Y, _, _],
];

// きのこのドット絵 (10x10)
const mushroomPixels: PixelColor[][] = [
  [_, _, _, R, R, R, R, _, _, _],
  [_, _, R, R, W, R, R, R, _, _],
  [_, R, R, W, W, R, R, R, R, _],
  [_, R, R, R, R, R, W, W, R, _],
  [R, R, R, R, R, R, R, W, R, R],
  [R, R, R, R, R, R, R, R, R, R],
  [_, _, _, W, W, W, W, _, _, _],
  [_, _, _, W, W, W, W, _, _, _],
  [_, _, _, W, W, W, W, _, _, _],
  [_, _, _, _, W, W, _, _, _, _],
];

export const pixelArtPresets: PixelArt[] = [
  { name: 'Heart', width: 10, height: 10, pixels: heartPixels },
  { name: 'Star', width: 10, height: 10, pixels: starPixels },
  { name: 'Smile', width: 10, height: 10, pixels: smilePixels },
  { name: 'Mushroom', width: 10, height: 10, pixels: mushroomPixels },
];

export const getDefaultPixelArt = (): PixelArt => pixelArtPresets[0];
