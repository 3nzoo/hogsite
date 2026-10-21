export type Point = { x: number; y: number; rotation: number };

export const GYOZA_COUNT = 5;

export function pinwheelPosition(index: number, centerX = 44.5, centerY = 55.4): Point {
  const step = 360 / GYOZA_COUNT;
  const angle = (-126 + index * step) * Math.PI / 180;
  return {
    x: centerX + Math.cos(angle) * 13.5,
    y: centerY + Math.sin(angle) * 13.5,
    rotation: ((90 + index * step + 180) % 360) - 180,
  };
}
