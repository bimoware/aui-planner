import { InputDataHookGroup, SectionsHookGroup } from "..";
import { SectionList } from "./SectionList";
import { SmallCredit } from "./SmallCredit";
import { AddSectionButton } from "./AddSectionButton";
import { Title } from "./Title";

export default function Panel({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    return <div className="w-5/12 flex flex-col gap-4 ">
        <Title />
        <div className="flex flex-col gap-2 p-4 overflow-y-auto bg-white/5 rounded-3xl">
            <AddSectionButton {...{ inputData, setInputData, sections, setSections }} />
            <SectionList {...{ sections, setSections }} />
        </div>
        <SmallCredit />
    </div>
}
