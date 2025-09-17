import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { ContextMenuButtonData, ContextMenuButtonsData, ContextMenuSubButtonData } from "@/lib"
import { ReactNode } from "react"


export function ContextMenuWrapper({ data, children }: {
    data: ContextMenuButtonsData,
    children: ReactNode
}) {
    return <ContextMenu>
        <ContextMenuTrigger className="p-1">
            {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="p-3 rounded-xl rounded-tl-md">
            {
                data.map(btn => btn.type === "btn"
                    ? <ContextMenuButton key={btn.name} {...btn} />
                    : <ContextMenuSubButton key={btn.name} {...btn} />
                )
            }
        </ContextMenuContent>
    </ContextMenu>
}

function ContextMenuButton(btn: ContextMenuButtonData) {
    return <ContextMenuItem className="flex gap-2"
        {...(btn.destructive ? { variant: "destructive" } : {})}
        onClick={btn.onClick}>
        {btn.icon && <btn.icon />} {btn.name}
    </ContextMenuItem>
}

function ContextMenuSubButton(btn: ContextMenuSubButtonData) {
    return <ContextMenuSub>
        <ContextMenuSubTrigger className="flex gap-2">
            {btn.icon && <btn.icon />} {btn.name}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
            {btn.btns.map(b => <ContextMenuButton key={b.name} {...b} />)}
        </ContextMenuSubContent>
    </ContextMenuSub>
}