import Image from "next/image";
import Link from "next/link";

export function SmallCredit() {
    return <div className="flex gap-2 items-center">
        <span>Made with ❤️ by</span>
        <Link href={"https://github.com/bimoware/aui-planner"} target="_blank"
            className="hover:underline hover:cursor-pointer">
            <div className="bg-accent p-1 px-1.5 inline-flex items-center gap-2 rounded-lg
            hover:scale-105 hover:-translate-y-1 duration-100">
                <Image src="/pfp.jpg" width={50} height={50} alt=""
                    className="rounded-full inline h-lh w-auto select-none" />
                Malik Lahlou
            </div>
        </Link>
    </div>
}