
export const padding = 2
export const columnWidth = 20
export const rowHeight = 10
export const width = padding * 2 + columnWidth * 5
export const getHeight = (maxEnd:number, minStart:number) => padding * 2 + rowHeight * (maxEnd - minStart)