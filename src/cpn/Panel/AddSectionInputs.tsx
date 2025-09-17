import AddSectionInput from "./AddSectionInput";
import { WeekDaysInputs } from "./WeekDaysInputs";
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip"
import { PopoverClose } from "@/components/animate-ui/primitives/radix/popover"
import { SectionStoreProp } from "@/lib";
import { Separator } from "@radix-ui/react-separator";

export default function AddSectionInputs({ sectionStore }: SectionStoreProp) {

    const cleanTime = (time: string) => time
        .replaceAll('/', ':')
        .replaceAll(' ', ':')
        .replaceAll('-', '')

    return <>
        <AddSectionInput {...{ sectionStore }} id="code" placeholder="Code (i.e CSC 1401)"
            clean={v => v.toUpperCase()} />
        <WeekDaysInputs {...{ sectionStore }} />
        <div className="flex gap-3 items-center">
            {
                (["start", "end"] as const)
                    .map(id => <AddSectionInput
                        key={id}
                        {...{ id, sectionStore }}
                        placeholder={`${id[0].toUpperCase()}${id.slice(1)} XX:XX`}
                        clean={cleanTime}
                    />)
            }
            <ConfirmButton {...{ sectionStore }} />
        </div>

        <ExtraSeparator />

        <AddSectionInput {...{ sectionStore }} id="name"
            placeholder="Name (i.e Data Structures)" />
        <div className="flex gap-3">
            <AddSectionInput {...{ sectionStore }} id="professor" className="w-2/3" />
            <AddSectionInput {...{ sectionStore }} id="location" className="w-1/3" />
        </div>
        <AddSectionInput {...{ sectionStore }} id="notes" />
    </>
}

function ExtraSeparator() {
    return <div className="flex items-center gap-3 mt-2">
        <Separator className="outline-white/50 w-full outline-1 rounded-full"/>
        <span className="opacity-50 text-nowrap">Extra</span>
        <Separator className="outline-white/50 w-full outline-1 rounded-full" />
    </div>;
}

export function ConfirmButton({ sectionStore: { inputData, sections, addSection, clearInputData } }: SectionStoreProp) {

    const getTimeErrors = () => {
        const startErrors = []
        const endErrors = []

        const [isStartValid, isEndValid] = [inputData.start, inputData.end].map(t => /^\d{1,2}:\d{2}$/.test(t))
        const [startH, startM, endH, endM] = [
            ...inputData.start.split(':'),
            ...inputData.end.split(':')
        ].map(Number)

        if (!inputData.start) startErrors.push("Start time required")
        else if (!isStartValid) startErrors.push("Invalid start time format")
        else {
            if (startH < 0 || startH > 24) startErrors.push("Start hour should be between 0 & 23")
            if (startM < 0 || startM > 59) startErrors.push("Start minute should be between 0 & 59")
        }

        if (!inputData.end) endErrors.push("End time required")
        else if (!isEndValid) endErrors.push("Invalid end time format")
        else {

            if (endH < 0 || endH > 24) endErrors.push("End hour should be between 0 & 23")
            if (endM < 0 || endM > 59) endErrors.push("End minute should be between 0 & 59")
        }

        const allTimeErrors = [...startErrors, ...endErrors]
        if (!allTimeErrors.length) {
            if (startH > endH || (startH == endH && startM >= endM)) allTimeErrors.push("End time should be later than start time")
        }
        return allTimeErrors
    }

    const getAllErrors = () => {
        const errors = []

        if (!inputData.code) errors.push("Code required")
        if (!inputData.days.length) errors.push("Weekdays selection required (M, T, F...)")

        errors.push(...getTimeErrors())

        return errors
    }

    const [errors, setErrors] = useState<string[]>([])
    useEffect(() => { setErrors(getAllErrors()) }, [inputData])

    // TODO: popover opens an empty text instead of nothing, errors not updated 
    const button = <PopoverClose
        disabled={errors.length > 0}
        className="cursor-pointer disabled:cursor-not-allowed
        bg-primary text-secondary
        h-full rounded-lg p-1.5
        duration-100 enabled:active:scale-95 enabled:hover:scale-110
        disabled:opacity-50"
        onClick={(() => {
            if (errors.length) return;
            addSection(inputData)
            clearInputData()
        })}>
        <ArrowRight />
    </PopoverClose>;

    return !errors.length ? button : <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                {button}
            </TooltipTrigger>
            <TooltipContent>
                <div>
                    {errors.map((e, i) => (
                        <div key={i}>{e}</div>
                    ))}
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}