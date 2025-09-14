import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Plus } from "@/components/animate-ui/icons/plus";
import { Input } from "@/components/ui/input";
import { WeekDaysInputs } from "./WeekDaysInputs";
import { TimeInputs } from "./TimeInputs";
import { ExtraSeparator } from "./ExtraSeparator";
import { InputDataHookGroup, SectionsHookGroup } from "@/app/page";

export function AddSectionButton({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    return <Popover>
        <PopoverTrigger className="font-semibold w-fit flex cursor-pointer
        bg-primary text-secondary px-2 p-1 rounded-lg hover:scale-105 duration-100 active:scale-90">
            <Plus className="h-lh" /> Add Section
        </PopoverTrigger>
        <PopoverContent className="mx-3 flex flex-col gap-2 w-72">
            <Input placeholder="Code (i.e CSC 1401)" value={inputData.code}
                onChange={e => setInputData(prev => ({ ...prev, code: e.target.value }))} />
            <WeekDaysInputs {...{ inputData, setInputData }} />
            <TimeInputs {...{ inputData, setInputData, sections, setSections }} />

            {/* Extra */}
            <ExtraSeparator />
            <Input placeholder="Name (i.e Data Structures)"
                value={inputData.name}
                onChange={e => setInputData(prev => ({ ...prev, name: e.target.value }))} />
            <div className="flex gap-3">
                <Input placeholder="Professor" className="w-2/3"
                    value={inputData.professor}
                    onChange={e => setInputData(prev => ({ ...prev, professor: e.target.value }))} />
                <Input placeholder="Location" className="w-1/3"
                    value={inputData.location}
                    onChange={e => setInputData(prev => ({ ...prev, location: e.target.value }))} />
            </div>
            <Input placeholder="Notes"
                value={inputData.notes}
                onChange={e => setInputData(prev => ({ ...prev, notes: e.target.value }))} />
        </PopoverContent>
    </Popover>
}