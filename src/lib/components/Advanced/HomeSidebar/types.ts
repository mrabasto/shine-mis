import type { Fill, IconName } from '$lib/components/Base/Icon/types'

export interface SidebarLinks {
	href: string
	icon?: IconName
	iconFill?: Fill
	isShown?: () => boolean
	label: string
	onlyFor?: ['admin']
}
