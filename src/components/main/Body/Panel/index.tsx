import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Toggle } from "@/components/animate-ui/components/radix/toggle";
import { Plus, PlusIcon } from "@/components/animate-ui/icons/plus";
import { Input } from "@/components/ui/input";
import { EMPTY_SECTION, WeekDay, WEEKDAYNAMES, WEEKDAYS } from "@/lib/main";
import { useCallback, useEffect, useState } from "react";
import { InputDataHookGroup, SectionsHookGroup } from "..";
import { Separator } from "@radix-ui/react-separator";
import { ArrowRight } from "lucide-react";
import SectionList from "./SectionList";
import Title from "../../Title";
import Image from "next/image";
import SmallCredit from "./SmallCredit";

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

function AddSectionButton({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    return <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground p-2 px-3 rounded-lg font-semibold w-fit
                flex cursor-pointer">
            <Plus className="h-lh" /> Section
        </PopoverTrigger>
        <PopoverContent className="mx-3 flex flex-col gap-2 w-72">
            <Input placeholder="Code (i.e CSC 1401)" value={inputData.code}
                onChange={e => setInputData(prev => ({ ...prev, code: e.target.value }))} />
            <WeekDays {...{ inputData, setInputData }} />
            <Time {...{ inputData, setInputData, sections, setSections }} />

            {/* Extra */}
            {ExtraSeparator()}
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
        </PopoverContent>
    </Popover>
}


function ExtraSeparator() {
    return <div className="flex items-center gap-3 mt-2">
        <Separator className="outline-white/50 w-full outline-1 rounded-full" />
        <span className="opacity-50 text-nowrap">Extra</span>
        <Separator className="outline-white/50 w-full outline-1 rounded-full" />
    </div>;
}

function ConfirmButton({ inputData, setInputData, setSections }: InputDataHookGroup & SectionsHookGroup) {

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

    const button = <Button className="cursor-pointer aspect-square" disabled={errors.length > 0}
        onClick={(() => {
            if (errors.length) return;
            setSections(prev => ([...prev, inputData]))
            setInputData(EMPTY_SECTION)
        })}>
        <ArrowRight />
    </Button>

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
function Time({ inputData, setInputData, sections, setSections }: InputDataHookGroup & SectionsHookGroup) {
    const cleanTime = useCallback((time: string) => time
        .replaceAll('/', ':')
        .replaceAll(' ', ':')
        .replaceAll('-', ''), [])
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

function WeekDays({ inputData, setInputData }: InputDataHookGroup) {

    const toggleDay = useCallback((dayId: WeekDay) => {
        setInputData(v => ({
            ...v,
            days: v.days.includes(dayId)
                ? v.days.filter(d => d !== dayId)
                : [...v.days, dayId]
        }))
    }, [])

    return <div className="flex gap-2 items-center justify-around">
        <TooltipProvider>
            {
                WEEKDAYS.map(dayId => {
                    const enabled = inputData.days.includes(dayId)
                    const fullName = WEEKDAYNAMES[dayId]

                    return <Tooltip key={dayId}>
                        <TooltipTrigger className="*:rounded-lg">
                            <Toggle
                                className={`${enabled && "font-bold"} cursor-pointer
                                rounded-md !outline-2 focus:!outline-accent`}
                                pressed={enabled}
                                onPressedChange={() => toggleDay(dayId)}>
                                {dayId}
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            {fullName}
                        </TooltipContent>
                    </Tooltip>
                })
            }
        </TooltipProvider>
    </div>
}