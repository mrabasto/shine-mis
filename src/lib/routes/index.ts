export * from './finance'

import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import type { IconName } from '$lib/components/Base/Icon/types'
import { writable } from 'svelte/store'
import { Attendance, Finance, Home, ShineSchool } from './types'
import { ATTENDANCE_ROUTE } from './attendance'
import { FINANCE_ROUTE } from '.'

export const activeRoute = writable<Route>()

export interface Route {
	path: Attendance | Home | Finance | ShineSchool
	icon: IconName | UnplugIconName
	class?: string
	isActive?: boolean
	isShown?: boolean
	label?: string
}

export const routes = writable<Route[]>([
	{
		path: Home.INDEX,
		icon: 'home',
		label: 'Home',
	},
	{
		path: ShineSchool.INDEX,
		icon: 'crown-circle',
		label: 'Shine School',
	},

	ATTENDANCE_ROUTE,
	FINANCE_ROUTE,
])
