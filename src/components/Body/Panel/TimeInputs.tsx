import { Input } from "@/components/ui/input"
import { ConfirmButton } from "./ConfirmButton"
import { InputDataHookGroup, SectionsHookGroup } from "@/app/page"
import { PopoverClose } from "@/components/animate-ui/primitives/radix/popover"

export function TimeInputs({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    const cleanTime = (time: string) => time
        .replaceAll('/', ':')
        .replaceAll(' ', ':')
        .replaceAll('-', '')
    return <div className="flex gap-3 items-center">
        <Input placeholder="Start XX:XX"
            value={inputData.start}
            onChange={e => setInputData(prev => ({ ...prev, start: cleanTime(e.target.value) }))} />
        <span>-</span>
        <Input placeholder="End XX:XX"
            value={inputData.end}
            onChange={e => setInputData(prev => ({ ...prev, end: cleanTime(e.target.value) }))} />
        <ConfirmButton {...{ inputData, setInputData, sections, setSections }} />
    </div>
}