import { Input } from "@/components/ui/input";
import { Section, SectionStoreProp } from "@/lib";

export default function AddSectionInput({
    sectionStore, placeholder, id, clean, className
}: SectionStoreProp & {
    id: keyof Section,
    placeholder?: string,
    clean?: (value: string) => string,
    className?: string
}) {
    return <Input
        {...{ className }}
        placeholder={placeholder ?? (id[0].toUpperCase() + id.slice(1))}
        value={sectionStore.inputData[id]}
        onChange={e => sectionStore.setInputData({
            ...sectionStore.inputData,
            [id]: clean ? clean(e.target.value) : e.target.value
        })} />
}