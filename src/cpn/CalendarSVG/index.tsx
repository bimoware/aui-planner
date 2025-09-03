import { Element } from "./extra/types";
import { getMiddlePoints } from "./extra/util";

export default function CalendarSVG({ elems = [] }: { elems?: Element[] }) {
    if (!elems.length) return "...";

    const minStart = Math.min(...elems.map(e => e.start.h))
    const maxEnd = Math.max(...elems.map(e => e.end.h))

    const padding = 2
    const columnWidth = 20
    const rowHeight = 10
    const width = padding * 2 + columnWidth * 5
    const height = padding * 2 + rowHeight * (maxEnd - minStart)

    return <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {
            // The 4 lines separating the 5 work days (the vertical lines)
            getMiddlePoints(0, 5, 4)
                .map(id => {
                    const x = padding + columnWidth * id
                    return <line key={id}
                        x1={x}
                        x2={x}
                        y1={padding}
                        y2={height - padding}
                        stroke="white"
                        strokeWidth={0.2}
                    />
                })
        }
        {
            // The name of the days (the text between the vertical lines)
            ["M", "T", "W", "R", "F"].map((day, i) => {
                const x = padding + columnWidth * i + columnWidth / 2
                return <text key={day}
                    x={x}
                    y={padding}
                    fill="white"
                    fontSize={2}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {day}
                </text>
            })
        }
        {
            // All hours around the times (the horizental lines)
            getMiddlePoints(minStart, maxEnd, 4)
                .map(id => {
                    const y = padding + rowHeight * (id - minStart)
                    return <line key={id}
                        x1={padding}
                        x2={width - padding}
                        y1={y}
                        y2={y}
                        stroke="white"
                        strokeWidth={0.2}
                    />
                })
                
        }
    </svg>
}