import { getPseudoRandomColor, SectionStoreProp, WEEKDAYNAMES } from "@/lib";
import { ContextMenuWrapper } from "./ContextMenuWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Tally5 } from "lucide-react";
import { Clock } from "@/components/animate-ui/icons/clock";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { MapPin } from "@/components/animate-ui/icons/map-pin";

// TODO: Add option to edit message
// TODO: Make selection useful (clear all) 
// TODO: Have history of courses
// TODO: Import courses from .ics or JSON or AddnDrop copy/paste
// TODO: Add tags (being able to create tags, color them, have icons on them, select them when creating a section, while making it still minimal)
export function SectionList({ sectionStore }: SectionStoreProp) {
    return sectionStore.sections.map(section => <ContextMenuWrapper
        key={section.code}
        data={sectionStore.getContextMenuData(section.code)}>
        <div
            className="rounded-lg space-x-2 space-y-2
            px-2 p-1
            border"
            style={{
                backgroundColor: getPseudoRandomColor(section.code, {
                    darkness: "30%",
                    opacity: "5%"
                })
            }}>
            <div className="inline-flex gap-2 items-center w-full">
                <Checkbox className="size-5" />
                <span className="text-nowrap inline-flex items-center border px-2 p-0.5 rounded-md bg-background shadow-inner">
                    {section.code}
                </span>
                <span className="select-all text-nowrap overflow-scroll">{section.name}</span>
            </div>
            <div className="flex flex-col p-2 pt-0 justify-center">
                {
                    ([
                        ['days', true, Tally5, false, `${section.days.join('')} (${section.days.map(d => WEEKDAYNAMES[d]).join(', ')})`],
                        ['time', true, Clock, true, `${section.start} - ${section.end}`],
                        ['professor', section.professor, UserRound, true],
                        ['location', section.location, MapPin, true],
                        ['notes', section.notes, Pencil, false]
                    ] as const)
                        .filter(extra => extra[1])
                        .map(([name, data, Icon, animated, explicitData]) => <div
                            key={name}
                            className="flex gap-0.5 items-center">
                            <Icon {...(animated && { animateOnHover: true })}
                            className={`h-[.8lh] ${!animated && "mx-0.5"}`} />
                            {explicitData || data}
                        </div>)
                }
            </div>
        </div>
        {/* <Accordion type="multiple">
            <AccordionItem value={section.code}
                className="rounded-lg text-nowrap space-x-2 space-y-2
                    duration-150 border"
                <AccordionTrigger className="py-0.5 p-2">
                    <div className="inline-flex gap-1 items-center">
                        <div className="inline-flex items-center">
                            <span className="inline-flex border px-2 p-0.5 rounded-md bg-background shadow-inner">{section.code}</span>
                        </div>
                        <span className="select-all">{section.name}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="ml-4 flex flex-col gap-1">
                        {
                            ([
                                ['days', true, Tally5, `${section.days.join('')} (${section.days.map(d => WEEKDAYNAMES[d]).join(', ')})`],
                                ['time', true, Clock, `${section.start} - ${section.end}`],
                                ['professor', section.professor, UserRound],
                                ['location', section.location, MapPin],
                                ['notes', section.notes, Pencil]
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
        </Accordion> */}
    </ContextMenuWrapper>)
}