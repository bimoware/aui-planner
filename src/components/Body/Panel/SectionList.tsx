import { getPseudoRandomColor, SelectedSectionIdGroup, Section, SectionsHookGroup, WEEKDAYNAMES } from "@/app/page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/animate-ui/components/radix/accordion";
import { ChevronLeftRight } from "@/components/animate-ui/icons/chevron-left-right";
import { Clock } from "@/components/animate-ui/icons/clock";
import { Copy } from "@/components/animate-ui/icons/copy";
import { MapPin } from "@/components/animate-ui/icons/map-pin";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Download, Pencil, Tally5, TextInitial, Trash } from "lucide-react";


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

//TODO: Add tags (being able to create tags, color them, have icons on them, select them when creating a section, while making it still minimal)
export function SectionList({ sections, setSections, selectedSectionId: hoveredSectionId, setSelectedSectionId: setHoveredSectionId }: SectionsHookGroup & SelectedSectionIdGroup) {
    return sections.map(s => <ContextMenu key={s.code}>
        <ContextMenuTrigger
            className="p-1"
            onClick={() => setHoveredSectionId(s.id)}
        >
            <Accordion type="multiple">
                <AccordionItem value={s.code}
                    className="rounded-lg text-nowrap space-x-2 items-center space-y-2
                duration-150 border"
                    {...(
                        hoveredSectionId === s.id && {
                            style: {
                                backgroundColor: getPseudoRandomColor(s.id, { darkness: "5%" })
                            }
                        })}>
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
                    <Download /> Export as file
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem>
                        Google Calendar/ICalendar (.ics)
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
        </ContextMenuContent>
    </ContextMenu >)

}