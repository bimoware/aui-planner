import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Plus } from "@/components/animate-ui/icons/plus";
import { SectionStoreProp } from "@/lib";
import AddSectionInputs from "./AddSectionInputs";

export function AddSectionButton({ sectionStore }: SectionStoreProp) {
    return <Popover>
        <PopoverTrigger className="font-semibold w-fit flex cursor-pointer
        bg-primary text-secondary px-2 p-1 rounded-lg hover:scale-105 duration-100 active:scale-90">
            <Plus className="h-lh" /> Add Section
        </PopoverTrigger>
        <PopoverContent className="mx-3 flex flex-col gap-2 w-80">
            <AddSectionInputs {...{ sectionStore }} />
        </PopoverContent>
    </Popover>
}