"use client"

import { useState } from "react"
import Panel from "@/components/Body/Panel"
import Calendar from "@/components/Body/Calendar"
import { EMPTY_SECTION, Section, TEMPLATE_SECTIONS } from "@/lib"

export default function Home() {
  // TODO: Sections should be stored in localStorage
  const [sections, setSections] = useState<Section[]>(TEMPLATE_SECTIONS)
  const [inputData, setInputData] = useState<Section>(EMPTY_SECTION)
  const [selectedSectionIds, setSelectedSectionIds] = useState<number[]>([])

  return (
    <div className="size-full flex flex-col gap-5 p-5">
      <div className="size-full p-3
    flex flex-col md:flex-row gap-5
    *:w-full md:*:h-full
    *:p-4">
        <Panel {...{ inputData, setInputData, sections, setSections, selectedSectionIds, setSelectedSectionIds }} />
        <Calendar  {...{ sections, setSections, selectedSectionIds, setSelectedSectionIds }} />
      </div>
    </div>
  );
}