
export type Element = {
    title: string;
    extra: string;
    days: ("M" | "T" | "W" | "R" | "F")[];
    start: { h: number; m: number; };
    end: { h: number; m: number; };
};
