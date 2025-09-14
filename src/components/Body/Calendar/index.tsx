import { getPseudoRandomColor, SelectedSectionIdGroup, SectionsHookGroup } from "@/app/page";
import { Meeting } from "@/app/page";

const padding = 0.3
const leftPadding = 0.3
const columnWidth = 1.5
const rowHeight = 0.8

export function getMiddlePoints(start: number, end: number, n: number) {
    const step = (end - start) / (n + 1);
    return Array.from({ length: n }, (_, i) => start + step * (i + 1));
}

export default function Calendar({ sections, selectedSectionId: hoveredSectionId }: SectionsHookGroup & SelectedSectionIdGroup) {

    if (!sections.length) return <div className="flex items-center justify-center w-full h-full">
        Start by adding a section
    </div>
    const minStartH = Math.min(...sections.map(s => s.start.split(':')[0]).map(Number)) - 1
    const maxEndH = Math.max(...sections.map(s => s.end.split(':')[0]).map(Number)) + 1

    const width = padding + leftPadding + columnWidth * 5 + padding
    const height = padding + rowHeight * (maxEndH - minStartH) + padding


    const strokeProps = {
        stroke: "white",
        strokeWidth: 0.1,
        strokeLinecap: "round" as const
    } as const

    const textProps = {
        fill: "white",
        textAnchor: "middle",
        alignmentBaseline: "middle",
        fontSize: 0.15,
        fontWeight: "800",
    } as const

    function getCoor(x: number, y: number) {
        return { x: padding + leftPadding + x * columnWidth, y: padding + y * rowHeight }
    }

    const meetings: Meeting[] = []
    for (const item of sections) {
        for (const day of item.days) {
            meetings.push({ ...item, day })
        }
    }

    const isSectionHovered = hoveredSectionId != undefined

    return <div className="w-full flex">
        <div className="hidden md:block md:w-2/5"></div>
        <svg viewBox={`0 0 ${width} ${height}`} className="md:w-3/5 md:pl-6">
            <g id="v-lines" opacity={0.5}>
                {
                    // The 4 lines separating the 5 work days (the vertical lines)
                    getMiddlePoints(padding + leftPadding, width - padding, 4)
                        .map(x => {
                            return <line key={x}
                                {...strokeProps}
                                x1={x}
                                x2={x}
                                y1={padding}
                                y2={height - padding}
                            />
                        })
                }
            </g>
            <g id="h-lines+labels+mid-h-lines">
                {
                    // All hours around the times (the horizental lines)
                    getMiddlePoints(minStartH, maxEndH, maxEndH - minStartH - 1)
                        .map(id => {
                            const y = padding + rowHeight * (id - minStartH)
                            return <g key={id}>
                                <line
                                    {...strokeProps}
                                    opacity={0.5}
                                    x1={padding + leftPadding}
                                    x2={width - padding}
                                    y1={y}
                                    y2={y}
                                />
                                <text
                                    {...textProps}
                                    fontSize={textProps.fontSize * 1.2}
                                    x={padding * 0.8}
                                    y={y}
                                    fill="white"
                                >
                                    {id}:00
                                </text>
                                <line
                                    {...strokeProps}
                                    strokeWidth={strokeProps.strokeWidth / 2}
                                    opacity={0.2}
                                    x1={padding + leftPadding - columnWidth / 8}
                                    x2={width - padding + columnWidth / 8}
                                    y1={y + rowHeight / 2}
                                    y2={y + rowHeight / 2}
                                />
                            </g>
                        })

                }
            </g>
            <g id="weekdays-labels">
                {
                    // The name of the days (the text between the vertical lines)
                    ["M", "T", "W", "R", "F"].map((day, i) => {
                        const x = padding + leftPadding + columnWidth * i + columnWidth / 2
                        return <text key={day}
                            {...textProps}
                            fontSize={textProps.fontSize * 2}
                            x={x}
                            y={padding}
                            fill="white"
                        >
                            {day}
                        </text>
                    })
                }
            </g>
            <g id="elements">
                {
                    // The actual elements (the rectangles with text)
                    meetings.map((e, i) => {
                        const isThisSectionHovered = isSectionHovered && hoveredSectionId === e.id
                        const dayIndex = "MTWRF".indexOf(e.day)
                        if (dayIndex === -1) return null;
                        const { x } = getCoor(dayIndex, 0)
                        const [startH, startM, endH, endM] = [
                            ...e.start.split(':'),
                            ...e.end.split(':')
                        ].map(Number)
                        const yStart = padding + rowHeight * (startH + startM / 60 - minStartH)
                        const yEnd = padding + rowHeight * (endH + endM / 60 - minStartH)
                        const y = yStart
                        const elemHeight = yEnd - yStart
                        return <g key={i}
                            opacity={!isSectionHovered || isThisSectionHovered ? 1 : 0.2}>
                            <rect
                                {...strokeProps}
                                fill={getPseudoRandomColor(e.id, { darkness: "5%" })}
                                strokeWidth={1 / 40}
                                strokeOpacity={0.5}
                                fillOpacity={1}
                                x={x + 1 / 20}
                                y={y}
                                width={columnWidth - 2 / 20}
                                height={elemHeight}
                                rx={0.1}
                                ry={0.1}
                            />
                            <text
                                {...textProps}
                                x={x + columnWidth / 2}
                                y={y + elemHeight / 2}
                                fill="white"
                            >
                                {e.code}
                            </text>
                        </g>
                    })
                }
            </g>
        </svg>
    </div >
}