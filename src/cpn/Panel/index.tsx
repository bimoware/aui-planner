import { SectionList } from "./SectionList";
import { AddSectionButton } from "./AddSectionButton";
import { Title } from "./Title";
import { SectionStoreProp } from "@/lib";
import Link from "next/link";
import Image from "next/image";

export default function Panel({ sectionStore }: SectionStoreProp) {
    return <div className="w-full md:w-2/5
    flex flex-col gap-4 static md:fixed max-h-[95vh]">
        <Title />
        <div className="flex flex-col gap-4 p-4 overflow-y-auto bg-foreground/3 rounded-3xl">
            <div className="flex justify-center items-center">
                <AddSectionButton {...{ sectionStore }} />
            </div>
            <div className="flex flex-col">
                <SectionList {...{ sectionStore }} />
            </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
            <SmallTip />
            <SmallCredit />
        </div>
    </div>
}

function SmallTip() {
    return <div className="flex items-center justify-center text-sm opacity-80 italic">
        😶‍🌫️ : Try right-clicking on a section to see more options
    </div>
}

function SmallCredit() {
    return <div className="flex gap-2 items-center justify-center">
        <span>Made with ❤️ by</span>
        <Link href={"https://github.com/bimoware/aui-planner"} target="_blank"
            className="hover:underline hover:cursor-pointer">
            <div className="bg-accent p-1 px-1.5 inline-flex items-center gap-2 rounded-lg
            hover:scale-105 hover:-translate-y-1 duration-100">
                <Image src="/pfp.jpg" width={50} height={50} alt=""
                    className="rounded-full inline h-lh w-auto select-none" />
                Malik
            </div>
        </Link>
    </div>
}