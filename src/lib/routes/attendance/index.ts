import { writable } from 'svelte/store'
import type { Route } from '..'
import { Attendance } from '../types'

export const ATTENDANCE_ROUTE: Route = {
	path: Attendance.INDEX,
	icon: 'alarm',
	isShown: true,
	label: 'Attendance',
}

export const attendanceRoutes = writable<Route[]>([
	ATTENDANCE_ROUTE,
	{
		path: Attendance.SCHEDULES,
		icon: 'sort-by-time-bold',
		label: 'Schedules',
	},
])
