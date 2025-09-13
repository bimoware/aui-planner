"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { EMPTY_SECTION, Section, TEMPLATE_SECTIONS } from "@/lib/main"
import Panel from "./Panel"
import Calendar from "./Calendar"

export type InputDataHookGroup = {
    "inputData": Section,
    "setInputData": Dispatch<SetStateAction<Section>>
}

export type SectionsHookGroup = {
    "sections": Section[],
    "setSections": Dispatch<SetStateAction<Section[]>>
}

export default function Body() {
    const [sections, setSections] = useState<Section[]>([]
        // TEMPLATE_SECTIONS
    )
    const [inputData, setInputData] = useState<Section>(EMPTY_SECTION)

    return <div className="size-full p-3
    flex gap-5
    *:h-full *:p-4">
        <Panel {...{ inputData, setInputData, sections, setSections }} />
        <Calendar  {...{ sections, setSections }} />
    </div>
}
