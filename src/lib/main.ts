export const WEEKDAYNAMES = {
    "M": "Monday",
    "T": "Tuesday",
    "W": "Wednesday",
    "R": "Thursday",
    "F": "Friday"
}
export const WEEKDAYS = ["M", "T", "W", "R", "F"] as const
export type WeekDay = typeof WEEKDAYS[number]

export const EMPTY_SECTION: Section = {
    code: '',
    name: '',
    days: [],
    start: '',
    end: '',
    professor: '',
    location: ''
}
export type Section = {
    code: string
    name: string
    days: WeekDay[]
    start: string
    end: string,
    professor: string,
    location: string
}

export type Meeting = Omit<Section,"days"> & { day: WeekDay } 

export const TEMPLATE_SECTIONS:Section[] = [
  {
    code: "CSC 2306 01",
    name: "Object-Oriented Programming",
    days: ["M", "W", "F"],
    start: "10:30",
    end: "11:20",
    professor: "",
    location: ""
  },
  {
    code: "FAS 1220 05",
    name: "Placing Ourselves in the World",
    days: ["M", "W", "F"],
    start: "14:00",
    end: "14:50",
    professor: "",
    location: ""
  },
  {
    code: "FRN 3310 02",
    name: "Advanced French Writing & Speaking",
    days: ["T", "R"],
    start: "08:30",
    end: "09:50",
    professor: "",
    location: ""
  },
  {
    code: "MTH 2320 02",
    name: "Linear and Matrix Algebra",
    days: ["T", "R"],
    start: "10:00",
    end: "11:20",
    professor: "",
    location: ""
  },
  {
    code: "PHY 1401 04",
    name: "Physics I",
    days: ["M", "W", "F"],
    start: "11:30",
    end: "12:20",
    professor: "",
    location: ""
  },
  {
    code: "PHY 1401 04 L",
    name: "Physics I Lab",
    days: ["M"],
    start: "17:40",
    end: "19:30",
    professor: "",
    location: ""
  }
];