import { Copy } from "@/components/animate-ui/icons/copy"
import { createEvent } from "ics"
import { Braces, Download, TextInitial, Trash } from "lucide-react"
import { ElementType } from "react"
import { create } from "zustand"

export const WEEKDAYNAMES = {
  "M": "Monday",
  "T": "Tuesday",
  "W": "Wednesday",
  "R": "Thursday",
  "F": "Friday"
}
export const WEEKDAYS = Object.keys(WEEKDAYNAMES) as (keyof typeof WEEKDAYNAMES)[]
const DOW_MAP: Record<WeekDay, number> = { M: 1, T: 2, W: 3, R: 4, F: 5 }
export type WeekDay = (typeof WEEKDAYS)[number]

export const EMPTY_SECTION: Section = {
  code: '',
  name: '',
  days: [],
  start: '',
  end: '',
  professor: '',
  location: '',
  notes: ''
}
export type Section = {
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

export const TEMPLATE_SECTIONS: Section[] = [
  {
    code: "CSC 2306 04",
    name: "Object-Oriented Programming",
    days: ["M", "W", "F"],
    start: "10:30",
    end: "11:20",
    professor: "MOURHIR, Asmaa",
    location: "NAB, 001",
    notes: ''
  },
  {
    code: "FAS 1220 02",
    name: "Placing Ourselves in the World",
    days: ["M", "W", "F"],
    start: "14:00",
    end: "14:50",
    professor: "OUBOUMERRAD, Said",
    location: "NAB, 101",
    notes: ''
  },
  {
    code: "FRN 3310 01",
    name: "Advanced French Writing & Speaking",
    days: ["T", "R"],
    start: "08:30",
    end: "09:50",
    professor: "DEVIER, Melissa",
    location: "NAB, 104",
    notes: ''
  },
  {
    code: "MTH 2320 08",
    name: "Linear and Matrix Algebra",
    days: ["T", "R"],
    start: "10:00",
    end: "11:20",
    professor: "KALMOUN, El Mostafa",
    location: "NAB, 202",
    notes: ''
  },
  {
    code: "PHY 1401 02",
    name: "Physics I",
    days: ["M", "W", "F"],
    start: "11:30",
    end: "12:20",
    professor: "DARHMAOUI, Hassane",
    location: "NAB, 007",
    notes: ''
  },
  {
    code: "PHY 1401 02 L",
    name: "Physics I Lab",
    days: ["M"],
    start: "17:40",
    end: "19:30",
    professor: "JAFGHALI, Sara",
    location: "B7, 004",
    notes: ''
  }
]

// TODO: Make better color picker (not colorblind-friendly for now, hard to see)
export function getPseudoRandomColor(code: string, opts?: {
  opacity?: string
  darkness?: string
}) {
  const n = code.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
  return `hsla(${(n * 55) % 360},100%,${opts?.darkness ?? "60%"},${opts?.opacity ?? "1"})`
}

export type ContextMenuButtonData = {
  type: "btn",
  name: string,
  destructive?: boolean
  icon?: ElementType
  onClick: () => void
}
export type ContextMenuSubButtonData = {
  type: "sub",
  name: string
  icon?: ElementType
  btns: ContextMenuButtonData[]
}
export type ContextMenuButtonsData = (ContextMenuButtonData | ContextMenuSubButtonData)[]

export type SectionStore = {
  sections: Section[]

  getSection: (code: string) => Section

  getContextMenuData: (code: string) => ContextMenuButtonsData
  copySectionAsText: (code: string) => void
  copySectionAsJSON: (code: string) => void

  formatDurationIcs: (code: string) => { hours: number, minutes: number }
  formatStartIcs: (code: string) => [number, number, number, number, number]
  downloadSectionAsICS: (code: string) => void

  fetchLocalStorageSections: () => void
  updateLocalStorageSections: (sections?: Section[]) => void

  inputData: Section
  setInputData: (inputData: Section) => void
  clearInputData: () => void

  selectedSectionCodes: string[]
  addSection: (code: Section) => void
  removeSection: (code: string) => void
  toggleSelection: (code: string) => void
}

export type SectionStoreProp = { sectionStore: SectionStore }

export const useSections = create((set, get): SectionStore => ({
  sections: [],

  getSection(code) {
    return get().sections.find(s => s.code === code)!
  },
  getContextMenuData(code) {
    return [
      {
        type: "sub",
        icon: Copy,
        name: "Copy",
        btns: ([
          [TextInitial, "Raw text", () => get().copySectionAsText(code)],
          [Braces, "JSON", () => get().copySectionAsJSON(code)]
        ] as const).map(([icon, name, onClick]) => ({
          type: "btn",
          name, icon, onClick
        }))
      },
      {
        type: "sub",
        icon: Download,
        name: "Export as",
        btns: [
          {
            type: "btn",
            name: ".ics (iCalendar / Google Calendar)",
            onClick: () => get().downloadSectionAsICS(code)
          }
        ]
      },
      {
        type: "btn",
        name: "Delete",
        icon: Trash,
        destructive: true,
        onClick: () => get().removeSection(code)
      }
    ]
  },

  copySectionAsText(code) {
    const section = get().getSection(code)
    const text = Object.keys(section)
      .filter(k => section[k as keyof typeof section])
      .map(k => `${k[0].toUpperCase()}${k.slice(1)}: ${section[k as keyof Section]}`)
      .join('\n')
    return navigator.clipboard.writeText(text)
  },
  copySectionAsJSON(code) {
    return navigator.clipboard.writeText(
      JSON.stringify(get().getSection(code))
    )
  },

  formatDurationIcs(code) {
    const section = get().getSection(code)
    const [startH, startM, endH, endM] = [
      ...section.start.split(':'),
      ...section.end.split(':')
    ].map(Number)
    let hours = endH - startH
    let minutes = endM - startM
    if (minutes < 0) {
      hours -= 1
      minutes += 60
    }
    return { hours, minutes }
  },

  formatStartIcs(code) {
    const section = get().getSection(code)
    const date = new Date()

    // find next occurrence in this week (or today if today is in s.days lol)
    const today = date.getDay() || 7
    const offsets = section.days
      .map(d => (DOW_MAP[d] - today + 7) % 7)
      .filter(o => o >= 0)
    const diff = Math.min(...offsets)

    date.setDate(date.getDate() + diff)
    const [hour, minute] = section.start.split(":").map(Number)
    date.setHours(hour, minute, 0, 0)

    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute] as [number, number, number, number, number]
  },
  downloadSectionAsICS(code) {
    const section = get().getSection(code)
    const content = createEvent({
      start: get().formatStartIcs(code),
      startInputType: "local",
      startOutputType: "local",
      duration: get().formatDurationIcs(code),
      title: `${section.code} | ${section.name}`,
      location: `${section.location} by ${section.professor}`,
      description: section.notes,
      recurrenceRule: "FREQ=WEEKLY;BYDAY=" + section.days.map(d => (
        ({ M: "MO", T: "TU", W: "WE", R: "TH", F: "FR" } as const)[d]
      )).join(",")
    }).value!
    const filename = section.code.toLowerCase().replaceAll(' ', '_')
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  },
  fetchLocalStorageSections: () => {
    const savedData = localStorage.getItem('sections');
    if (savedData) return set(st => ({ ...st, sections: JSON.parse(savedData) }));
    set(st => {
      st.updateLocalStorageSections(TEMPLATE_SECTIONS)
      return { ...st, sections: TEMPLATE_SECTIONS }
    })
  },
  updateLocalStorageSections: sections => {
    localStorage.setItem('sections', JSON.stringify(sections ?? get().sections))
  },

  inputData: EMPTY_SECTION,
  setInputData: (inputData: Section) => set(st => ({ ...st, inputData })),
  clearInputData: () => set(st => ({ ...st, inputData: EMPTY_SECTION })),

  selectedSectionCodes: [],
  addSection: (inputData) => {
    set(st => ({ ...st, sections: [...st.sections, inputData], inputData: EMPTY_SECTION }))
    get().updateLocalStorageSections()
  },
  removeSection: code => {
    set(st => ({
      ...st,
      sections: st.sections.filter(s => s.code != code)
    }))
    get().updateLocalStorageSections()
  },
  toggleSelection: i => {
    set(st => ({
      ...st,
      selectedSectionCodes: st.selectedSectionCodes.includes(i)
        ? st.selectedSectionCodes.filter(sId => sId != i)
        : [...st.selectedSectionCodes, i]
    }))
  }
}))

