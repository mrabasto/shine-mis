import { writable } from 'svelte/store'
import type { Route } from '..'
import { Finance } from '../types'

export const FINANCE_ROUTE: Route = {
	path: Finance.INDEX,
	icon: 'money-square',
	isShown: true,
	label: 'Finance',
}

export const financeRoutes = writable<Route[]>([
	FINANCE_ROUTE,

	{
		path: Finance.CASH_REQUESTS,
		icon: 'hand-money-linear',
		label: 'Cash Requests',
	},
])
