// Will get n middle points between start and end (exclusive)
export function getMiddlePoints(start: number, end: number, n: number) {
    const step = (end - start) / (n + 1);
    return Array.from({ length: n }, (_, i) => start + step * (i + 1));
}
