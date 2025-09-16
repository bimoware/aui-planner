
export function getMiddlePoints(start: number, end: number, n: number) {
    const step = (end - start) / (n + 1);
    return Array.from({ length: n }, (_, i) => start + step * (i + 1));
}
export const padding = 0.3;
export const leftPadding = 0.3;
export const columnWidth = 1.5;
export const rowHeight = 0.8;

export const strokeProps = {
    stroke: "white",
    strokeWidth: 0.1,
    strokeLinecap: "round" as const
} as const

export const textProps = {
    fill: "white",
    textAnchor: "middle",
    alignmentBaseline: "middle",
    fontSize: 0.15,
    fontWeight: "800",
} as const

export function getCoor(x: number, y: number) {
    return { x: padding + leftPadding + x * columnWidth, y: padding + y * rowHeight }
}