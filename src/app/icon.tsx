import CalendarIcon from '@/components/Body/Panel/CalendarIcon'
import { ImageResponse } from 'next/og'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(<CalendarIcon />, { ...size })
}