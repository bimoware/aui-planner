import CalendarSVG from "@/cpn/CalendarSVG";

export default function HomePage() {
    return <div className="flex w-full h-full bg-white/5 rounded-2xl shadow-2xl items-center justify-center">
        <CalendarSVG elems={[
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                day: "M",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                day: "W",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                day: "F",
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            },

            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                day: "M",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },
            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                day: "W",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },
            {
                title: "FAS 1220 05",
                extra: "Placing Ourselves in the World",
                day: "F",
                start: { h: 14, m: 0 },
                end: { h: 14, m: 50 }
            },

            {
                title: "FRN 3310 02",
                extra: "Advanced French Writing & Speaking",
                day: "T",
                start: { h: 8, m: 30 },
                end: { h: 9, m: 50 }
            },
            {
                title: "FRN 3310 02",
                extra: "Advanced French Writing & Speaking",
                day: "R",
                start: { h: 8, m: 30 },
                end: { h: 9, m: 50 }
            },

            {
                title: "MTH 2320 06",
                extra: "Linear and Metrix Algebra",
                day: "T",
                start: { h: 16, m: 0 },
                end: { h: 17, m: 20 }
            },
            {
                title: "MTH 2320 06",
                extra: "Linear and Metrix Algebra",
                day: "R",
                start: { h: 16, m: 0 },
                end: { h: 17, m: 20 }
            },

            {
                title: "PHY 1401 04",
                extra: "Physics I",
                day: "M",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },
            {
                title: "PHY 1401 04",
                extra: "Physics I",
                day: "W",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },
            {
                title: "PHY 1401 04",
                extra: "Physics I",
                day: "F",
                start: { h: 11, m: 30 },
                end: { h: 12, m: 20 }
            },

            {
                title: "PHY 1401 04 L",
                extra: "Physics I Lab",
                day: "M",
                start: { h: 17, m: 40 },
                end: { h: 19, m: 30 }
            }
        ]} />

    </div>
}