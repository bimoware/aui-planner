import { Input } from "@/components/ui/input"
import { ConfirmButton } from "./ConfirmButton"
import { InputDataHookGroup, SectionsHookGroup } from ".."

export function TimeInputs({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    const cleanTime = (time: string) => time
        .replaceAll('/', ':')
        .replaceAll(' ', ':')
        .replaceAll('-', '')
    return <div className="flex gap-3">
        <Input placeholder="Start (i.e 13:10)"
            value={inputData.start}
            onChange={e => setInputData(prev => ({ ...prev, start: cleanTime(e.target.value) }))} />
        <Input placeholder="End (i.e 14:30)"
            value={inputData.end}
            onChange={e => setInputData(prev => ({ ...prev, end: cleanTime(e.target.value) }))} />
        <ConfirmButton {...{ inputData, setInputData, sections, setSections }} />
    </div>
}