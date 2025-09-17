import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip"
import { Toggle } from "@/components/animate-ui/components/radix/toggle"
import { SectionStoreProp, WeekDay, WEEKDAYNAMES, WEEKDAYS } from "@/lib"

export function WeekDaysInputs({ sectionStore: { inputData, setInputData } }: SectionStoreProp) {

    const toggleDay = (dayId: WeekDay) => {
        const { days } = inputData
        setInputData({
            ...inputData,
            days: days.includes(dayId)
                ? days.filter(d => d !== dayId)
                : [...days, dayId]
        })
    }

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