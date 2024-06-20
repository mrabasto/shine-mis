import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import type { IconName } from '$lib/components/Base/Icon/types'
import { writable } from 'svelte/store'
import { Finance, Home, ShineSchool } from './types'

export const activeRoute = writable<Route>()

export interface Route {
	path: Home | Finance | ShineSchool
	icon: IconName | UnplugIconName
	class?: string
	isActive?: boolean
	label?: string
}

export const routes = writable<Route[]>([
	{
		path: Home.INDEX,
		icon: 'home',
	},
	{
		path: ShineSchool.INDEX,
		icon: 'crown-circle',
	},

	{
		path: Finance.INDEX,
		icon: 'money-square',
	},
])
