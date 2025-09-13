import { SectionsHookGroup } from "..";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { TrashIcon } from "lucide-react";

export function SectionList({ sections, setSections }: SectionsHookGroup) {
    return sections.map(s => <div key={s.code}
        className="border rounded-lg p-1 text-nowrap space-x-2 inline-flex items-center">
        <div className="inline-flex items-center">
            <Popover>
                <PopoverTrigger className="inline-flex items-center">
                    <TrashIcon className={'h-[0.7lh] inline cursor-pointer text-red-500/50 hover:scale-105'}
                        onClick={() => setSections(prev => prev.filter(p => p.code != s.code))} />
                </PopoverTrigger>
                <PopoverContent side="bottom" className="m-2">
                </PopoverContent>
            </Popover>
            <span className="inline-flex border px-2 p-0.5 rounded-md">{s.code}</span>
        </div>
        <span className="select-all">{s.name}</span>
    </div>)

}