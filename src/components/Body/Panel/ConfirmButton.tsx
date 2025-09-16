import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip"
import { PopoverClose } from "@/components/animate-ui/primitives/radix/popover"
import { EMPTY_SECTION, InputDataHookGroup, SectionsHookGroup } from "@/lib"

export function ConfirmButton({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {

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

    const button = <PopoverClose
        disabled={errors.length > 0}
        className="cursor-pointer disabled:cursor-not-allowed
        bg-primary text-secondary
        h-full rounded-lg p-1.5
        duration-100 enabled:active:scale-95 enabled:hover:scale-110
        disabled:opacity-50"
        onClick={(() => {
            if (errors.length) return;
            const newId = Math.max(...sections.map(s => s.id)) + 1
            const newInputData = { ...inputData, id: newId }
            setSections(prev => ([...prev, newInputData]))
            setInputData(EMPTY_SECTION)
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