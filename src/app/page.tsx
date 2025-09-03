import CalendarSVG from "@/cpn/CalendarSVG";

export default function HomePage() {
    return <div className="flex w-full h-full bg-white/5 rounded-2xl shadow-2xl items-center justify-center">
        <CalendarSVG elems={[
            {
                title: "CSC 2306 01",
                extra: "Object-Oriented Programming",
                days: ["M","W","F"],
                start: { h: 10, m: 30 },
                end: { h: 11, m: 20 }
            }
        ]} />
    </div>
}