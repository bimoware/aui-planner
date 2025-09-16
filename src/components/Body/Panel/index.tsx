import { SectionList } from "./SectionList";
import { SmallCredit } from "./SmallCredit";
import { AddSectionButton } from "./AddSectionButton";
import { Title } from "./Title";
import { InputDataHookGroup, SectionsHookGroup, SelectedSectionIdsGroup } from "@/lib";

export default function Panel({
    inputData, setInputData, sections, setSections, selectedSectionIds, setSelectedSectionIds
}: InputDataHookGroup & SectionsHookGroup & SelectedSectionIdsGroup) {
    return <div className="w-full md:w-2/5
    flex flex-col gap-4 static md:fixed max-h-[95vh]">
        <Title />
        <div className="flex flex-col gap-4 p-4 overflow-y-auto bg-foreground/3 rounded-3xl">
            <div className="flex justify-center items-center">
                <AddSectionButton {...{ inputData, setInputData, sections, setSections }} />
            </div>
            {/* TODO: Add "Import" & "Export" as txt or .icl (google calendar & icalendar)  */}
            <div className="flex flex-col">
                <SectionList {...{ sections, setSections, selectedSectionIds, setSelectedSectionIds }} />
            </div>
        </div>
        <SmallCredit />
    </div>
}
