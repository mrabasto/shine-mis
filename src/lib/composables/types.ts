import type { SidebarLinks } from '$lib/components/Advanced/HomeSidebar/types'

import { Fill } from '$lib/components/Base/Icon/types'
import { Admin, BikeRoutes, BikeStore, Home } from '$lib/types/Route'
import { writable } from 'svelte/store'

export const links = writable<Array<SidebarLinks>>([
	{
		href: Home.INDEX,
		icon: 'home',
		label: 'Home',
	},
	{
		href: '#',
		icon: 'thread',
		iconFill: Fill.PRIMARY,
		label: 'Your Threads',
	},
	{
		href: '#',
		icon: 'save',
		iconFill: Fill.SECONDARY,
		label: 'Saved Threads',
	},
	{
		href: '#',
		icon: 'people',
		iconFill: Fill.INFO,
		label: 'Bike Buddies',
	},
	{
		href: BikeRoutes.INDEX,
		icon: 'map',
		iconFill: Fill.SUCCESS,
		label: 'Bike Routes',
	},
	{
		href: Admin.INDEX,
		icon: 'cursor-pointer',
		label: 'Admin Panel',
		onlyFor: ['admin'],
	},
	{
		href: BikeStore.INDEX,
		icon: 'shop',
		iconFill: Fill.SUCCESS,
		label: 'Bike Store',
	},
])

export default links
