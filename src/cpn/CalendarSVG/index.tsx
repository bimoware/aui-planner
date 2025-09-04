import { Element } from "./extra/types";
import { getMiddlePoints } from "./extra/util";

export default function CalendarSVG({ elems = [] }: { elems?: Element[] }) {
    if (!elems.length) return "...";

    const minStart = Math.min(...elems.map(e => e.start.h))
    const maxEnd = Math.max(...elems.map(e => e.end.h))

    const padding = 2
    const leftPadding = 3
    const columnWidth = 15
    const rowHeight = 15
    const width = padding + leftPadding + columnWidth * 5 + padding
    const height = padding + rowHeight * (maxEnd - minStart) + padding

    return <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <g id="v-lines" opacity={0.5}>
        {
            // The 4 lines separating the 5 work days (the vertical lines)
            getMiddlePoints(padding + leftPadding, width - leftPadding,4)
                .map(x => {
                    return <line key={x}
                        x1={x}
                        x2={x}
                        y1={padding}
                        y2={height - padding}
                        stroke="white"
                        strokeWidth={0.2}
                    />
                })
        }
        </g>
        <g id="weekdays-labels">
        {
            // The name of the days (the text between the vertical lines)
            ["M", "T", "W", "R", "F"].map((day, i) => {
                const x = padding + leftPadding + columnWidth * i + columnWidth / 2
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
        </g>
        <g id="h-lines" opacity={0.5}>
        {
            // All hours around the times (the horizental lines)
            getMiddlePoints(minStart, maxEnd, maxEnd - minStart - 1)
                .map(id => {
                    const y = padding + rowHeight * (id - minStart)
                    return <line key={id}
                        x1={padding + leftPadding}
                        x2={width - padding}
                        y1={y}
                        y2={y}
                        stroke="white"
                        strokeWidth={0.2}
                    />
                })

        }
        </g>
        <g id="time-labels">
            {
            getMiddlePoints(minStart, maxEnd, maxEnd - minStart - 1)
            .map(id =>{
                const y = padding + rowHeight * (id - minStart)
                return <text key={id}
                    x={padding}
                    y={y}
                    fill="white"
                    fontSize={2}
                    textAnchor="end"
                    alignmentBaseline="middle"
                >
                    {id}:00
                </text>
            })
            }
        </g>
    </svg>
}