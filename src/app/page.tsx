"use client"

import Panel from "@/cpn/Panel"
import Calendar from "@/cpn/Calendar"
import { useSections } from "@/lib"
import { useEffect } from "react"

export default function Home() {
  const sectionStore = useSections()
  useEffect(() => sectionStore.fetchLocalStorageSections(),[])
  return (
    <div className="size-full flex flex-col gap-5 p-5">
      <div className="size-full p-3
    flex flex-col md:flex-row gap-5
    *:w-full md:*:h-full
    *:p-4">
        <Panel {...{ sectionStore }} />
        <Calendar  {...{ sectionStore }} />
      </div>
    </div>
  );
}