type Element = {
    title: string,
    extra: string,
    days: ("M" | "T" | "W" | "R" | "F")[],
    start: { h: number, m: number },
    end: { h: number, m: number }
}

export default function CalendarSVG({ elems = [] }: { elems?: Element[] }) {
    if(!elems.length) return;
    const smallestStart = Math.min(...elems.map(e => e.start.h))
    const biggestEnd = Math.max(...elems.map(e => e.end.h))
    return "..."
//     return <svg viewBox="0 0 160 90">

//     </svg>
}
