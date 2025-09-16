import { getPseudoRandomColor, SelectedSectionIdGroup, Section, SectionsHookGroup, WEEKDAYNAMES, WeekDay, WEEKDAYS } from "@/app/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/animate-ui/components/radix/accordion";
import { ChevronLeftRight } from "@/components/animate-ui/icons/chevron-left-right";
import { Clock } from "@/components/animate-ui/icons/clock";
import { Copy } from "@/components/animate-ui/icons/copy";
import { MapPin } from "@/components/animate-ui/icons/map-pin";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Download, Pencil, Tally5, TextInitial, Trash } from "lucide-react";
import { createEvent, createEvents } from 'ics'

function copyText(section: Section) {
    const text = Object.keys(section)
        .filter(k => k !== "id")
        .map(k => `${k[0].toUpperCase()}${k.slice(1)}: ${section[k as keyof Section]}`)
        .join('\n')
    return navigator.clipboard.writeText(text)
}

function copyJSON(section: Section) {
    const sectionCopy: any = { ...section };
    sectionCopy["id"] = undefined;
    return navigator.clipboard.writeText(
        JSON.stringify(sectionCopy)
    )
}

function formatStart(s: Section) {
    const date = new Date()
    const DOW_MAP: Record<WeekDay, number> = { M: 1, T: 2, W: 3, R: 4, F: 5 }

    // find next occurrence in this week (or today if today is in s.days lol)
    const today = date.getDay() || 7
    const offsets = s.days
        .map(d => (DOW_MAP[d] - today + 7) % 7)
        .filter(o => o >= 0)
    const diff = Math.min(...offsets)

    date.setDate(date.getDate() + diff)
    const [hour, minute] = s.start.split(":").map(Number)
    date.setHours(hour, minute, 0, 0)

    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute] as [number, number, number, number, number]
}

function formatDuration(s: Section) {
    const [startH, startM, endH, endM] = [...s.start.split(':'), ...s.end.split(':')].map(Number)
    let hours = endH - startH
    let minutes = endM - startM
    if (minutes < 0) {
        hours -= 1
        minutes += 60
    }
    return { hours, minutes }
}

function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}


//TODO: Add tags (being able to create tags, color them, have icons on them, select them when creating a section, while making it still minimal)
export function SectionList({ sections, setSections, selectedSectionId, setSelectedSectionId }: SectionsHookGroup & SelectedSectionIdGroup) {
    return sections.map(s => <ContextMenu key={s.id}>
        <ContextMenuTrigger
            className="p-1"
            onClick={() => setSelectedSectionId(prev => typeof (prev) === "number" && prev === s.id ? undefined : s.id)}
        >
            <Accordion type="multiple">
                <AccordionItem value={s.code}
                    className="rounded-lg text-nowrap space-x-2 items-center space-y-2
                duration-150 border"
                    style={{ backgroundColor: getPseudoRandomColor(s.id, { darkness: "5%" }) }}
                >
                    <AccordionTrigger className="py-0.5 p-2">
                        <div className="inline-flex gap-1 items-center">
                            <div className="inline-flex items-center">
                                <span className="inline-flex border px-2 p-0.5 rounded-md bg-background shadow-inner">{s.code}</span>
                            </div>
                            <span className="select-all">{s.name}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="ml-4 flex flex-col gap-1">
                            {
                                ([
                                    ['days', true, Tally5, `${s.days.join('')} (${s.days.map(d => WEEKDAYNAMES[d]).join(', ')})`],
                                    ['time', true, Clock, `${s.start} - ${s.end}`],
                                    ['professor', s.professor, UserRound],
                                    ['location', s.location, MapPin],
                                    ['notes', s.notes, Pencil]
                                ] as const)
                                    .filter(extra => extra[1])
                                    .map(([name, data, Icon, explicitData]) => <div
                                        key={name}
                                        className="flex gap-0.5 items-center">
                                        <Icon className={"h-[.8lh]"} />
                                        {explicitData || data}
                                    </div>)
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </ContextMenuTrigger>
        <ContextMenuContent className="p-3 rounded-xl rounded-tl-md">
            <ContextMenuSub>
                <ContextMenuSubTrigger className="gap-2">
                    <Copy /> Copy
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    {
                        ([
                            [TextInitial, "Raw text", () => copyText(s)],
                            [ChevronLeftRight, "JSON", () => copyJSON(s)]
                        ] as const)
                            .map(([Icon, name, func]) =>
                                <ContextMenuItem key={name}
                                    onClick={() => func()}>
                                    <Icon /> {name}
                                </ContextMenuItem>
                            )
                    }
                </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem className="gap-2" variant="destructive" onClick={() => setSections(prev => prev.filter(p => p.id !== s.id))}>
                <Trash /> Delete
            </ContextMenuItem>
            <ContextMenuSub>
                <ContextMenuSubTrigger className="gap-2">
                    <Download /> Export as
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={() => downloadICS(createEvent({
                        start: formatStart(s),
                        startInputType: "local",
                        startOutputType: "local",
                        duration: formatDuration(s),
                        title: `${s.code} | ${s.name}`,
                        location: `${s.location} by ${s.professor}`,
                        description: s.notes,
                        recurrenceRule: "FREQ=WEEKLY;BYDAY=" + s.days.map(d => (
                            ({ M: "MO", T: "TU", W: "WE", R: "TH", F: "FR" } as const)[d]
                        )).join(",")
                    }).value!,
                        s.code.toLowerCase().replaceAll(' ', '_')
                    )}>
                        Google Calendar/ICalendar (.ics)
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
        </ContextMenuContent>
    </ContextMenu >)

}