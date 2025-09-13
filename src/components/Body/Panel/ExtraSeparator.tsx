
import { Separator } from "@radix-ui/react-separator";

export function ExtraSeparator() {
    return <div className="flex items-center gap-3 mt-2">
        <Separator className="outline-white/50 w-full outline-1 rounded-full"/>
        <span className="opacity-50 text-nowrap">Extra</span>
        <Separator className="outline-white/50 w-full outline-1 rounded-full" />
    </div>;
}