import CalendarSVG from "@/cpn/CalendarSVG";

export default function HomePage() {
    return <div className="flex w-full h-full bg-white/5 rounded-2xl shadow-2xl items-center justify-center">
        <CalendarSVG elems={[
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                days: "M",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                days: "W",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                days: "F",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },

            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                days: "M",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },
            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                days: "W",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },
            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                days: "F",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },

            {
                title: "FRN 3310 02",
                extra: "Advanced French Writing & Speaking",
                days: "T",
                start: { h: 8, m: 30 },
                end: { h: 9, m: 50 }
            },
            {
                title: "FRN 3310 02",
                extra: "Advanced French Writing & Speaking",
                days: "R",
                start: { h: 8, m: 30 },
                end: { h: 9, m: 50 }
            },

            {
                title: "MTH 2320 06",
                extra: "Linear and Metrix Algebra",
                days: "T",
                start: { h: 16, m: 0 },
                end: { h: 17, m: 20 }
            },
            {
                title: "MTH 2320 06",
                extra: "Linear and Metrix Algebra",
                days: "R",
                start: { h: 16, m: 0 },
                end: { h: 17, m: 20 }
            },

            {
                title: "PHY 1401 04",
                extra: "Physics I",
                days: "M",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },
            {
                title: "PHY 1401 04",
                extra: "Physics I",
                days: "W",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },
            {
                title: "PHY 1401 04",
                extra: "Physics I",
                days: "F",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },

            {
                title: "PHY 1401 04 L",
                extra: "Physics I Lab",
                days: "M",
                start: { h: 17, m: 40 },
                end: { h: 19, m: 30 }
            }
        ]} />

    </div>
}