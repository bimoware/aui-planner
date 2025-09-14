import { SectionList } from "./SectionList";
import { SmallCredit } from "./SmallCredit";
import { AddSectionButton } from "./AddSectionButton";
import { Title } from "./Title";
import { SelectedSectionIdGroup, InputDataHookGroup, SectionsHookGroup } from "@/app/page";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { ListChevronsDownUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip";

export default function Panel({ inputData, setInputData, sections, setSections, selectedSectionId: hoveredSectionId, setSelectedSectionId: setHoveredSectionId }:
    InputDataHookGroup & SectionsHookGroup & SelectedSectionIdGroup) {
    return <div className="w-2/5 flex flex-col gap-4">
        <Title />
        <div className="flex flex-col gap-4 p-4 overflow-y-auto bg-foreground/3 rounded-3xl">
            <div className="flex justify-center items-center">
                <AddSectionButton {...{ inputData, setInputData, sections, setSections }} />
            </div>
            {/* TODO: Add "Import" & "Export" as txt or .icl (google calendar & icalendar)  */}
            <div className="flex flex-col">
                <SectionList {...{ sections, setSections, selectedSectionId: hoveredSectionId, setSelectedSectionId: setHoveredSectionId }} />
            </div>
        </div>
        <SmallCredit />
    </div>
}
