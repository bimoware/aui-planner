
export type Element = {
    title: string;
    extra: string;
    day: "M" | "T" | "W" | "R" | "F"
    start: { h: number; m: number; };
    end: { h: number; m: number; };
};
