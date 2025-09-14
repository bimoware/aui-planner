"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Panel from "@/components/Body/Panel"
import Calendar from "@/components/Body/Calendar"

export type InputDataHookGroup = {
  "inputData": Section,
  "setInputData": Dispatch<SetStateAction<Section>>
}
export type SectionsHookGroup = {
  "sections": Section[],
  "setSections": Dispatch<SetStateAction<Section[]>>
}
export type SelectedSectionIdGroup = {
  "selectedSectionId": number | undefined,
  "setSelectedSectionId": Dispatch<SetStateAction<number | undefined>>
}

export const WEEKDAYNAMES = {
  "M": "Monday",
  "T": "Tuesday",
  "W": "Wednesday",
  "R": "Thursday",
  "F": "Friday"
}
export const WEEKDAYS = ["M", "T", "W", "R", "F"] as const
export type WeekDay = (typeof WEEKDAYS)[number]

export const EMPTY_SECTION: Section = {
  id: 0,
  code: '',
  name: '',
  days: [],
  start: '',
  end: '',
  professor: '',
  location: '',
  notes:''
}
export type Section = {
  id: number
  code: string
  name: string
  days: WeekDay[]
  start: string
  end: string
  professor: string
  location: string
  notes: string
}

export type Meeting = Omit<Section, "days"> & { day: WeekDay }
// My sections but I randomly changed stuff lol cuz making realistic boiletplate is for loosers

export const TEMPLATE_SECTIONS = [
  {
    code: "CSC 2306 04",
    name: "Object-Oriented Programming",
    days: ["M", "W", "F"],
    start: "10:30",
    end: "11:20",
    professor: "MOURHIR, Asmaa",
    location: "NAB, 001"
  },
  {
    code: "FAS 1220 02",
    name: "Placing Ourselves in the World",
    days: ["M", "W", "F"],
    start: "14:00",
    end: "14:50",
    professor: "OUBOUMERRAD, Said",
    location: "NAB, 101"
  },
  {
    code: "FRN 3310 01",
    name: "Advanced French Writing & Speaking",
    days: ["T", "R"],
    start: "08:30",
    end: "09:50",
    professor: "DEVIER, Melissa",
    location: "NAB, 104"
  },
  {
    code: "MTH 2320 08",
    name: "Linear and Matrix Algebra",
    days: ["T", "R"],
    start: "10:00",
    end: "11:20",
    professor: "KALMOUN, El Mostafa",
    location: "NAB, 202"
  },
  {
    code: "PHY 1401 02",
    name: "Physics I",
    days: ["M", "W", "F"],
    start: "11:30",
    end: "12:20",
    professor: "DARHMAOUI, Hassane",
    location: "NAB, 007"
  },
  {
    code: "PHY 1401 02 L",
    name: "Physics I Lab",
    days: ["M"],
    start: "17:40",
    end: "19:30",
    professor: "JAFGHALI, Sara",
    location: "B7, 004"
  }
].map((e, i) => ({ ...e, id: i })) as Section[]

// TODO: Make better color picker (not colorblind-friendly for now, hard to see)
export function getPseudoRandomColor(id: Section["id"], opts?: {
  opacity?: string,
  darkness?: string
}) {
  return `hsla(${(id * 55) % 360},100%,${opts?.darkness ?? "60%"},${opts?.opacity ?? "1"})`
}

export default function Home() {
  // TODO: Sections should be stored in localStorage
  const [sections, setSections] = useState<Section[]>(TEMPLATE_SECTIONS)
  const [inputData, setInputData] = useState<Section>(EMPTY_SECTION)
  const [hoveredSectionId, setHoveredSectionId] = useState<number>()
  return (
    <div className="size-full flex flex-col gap-5 p-5">
      <div className="size-full p-3
    flex flex-col md:flex-row gap-5
    *:w-full md:*:h-full
    *:p-4">
        <Panel {...{ inputData, setInputData, sections, setSections, selectedSectionId: hoveredSectionId, setSelectedSectionId: setHoveredSectionId }} />
        <Calendar  {...{ sections, setSections, selectedSectionId: hoveredSectionId, setSelectedSectionId: setHoveredSectionId }} />
      </div>
    </div>
  );
}