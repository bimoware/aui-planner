import { LoaderCircle } from "@/components/animate-ui/icons/loader-circle";
import CalendarIcon from "../../icons/CalendarIcon";
import { CctvIcon } from "@/components/animate-ui/icons/cctv";

export function Title() {
    return <div className="inline-flex justify-center items-center">
        <h1 className="inline-flex gap-3 relative">
            <CalendarIcon />
            Malik's AUI Planner
            <BetaBadge />
        </h1>
    </div>
}

function BetaBadge() {
    return <div className="absolute bg-purple-900
    -top-4 -right-4 text-xl
    px-2 p-1 rounded-lg opacity-80
    rotate-6
    select-none hover:scale-110 duration-100
    flex gap-2">
        <CctvIcon animateOnHover className="h-lh" />
        BETA
    </div>
}