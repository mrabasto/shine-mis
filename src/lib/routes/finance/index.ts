import { writable } from 'svelte/store'
import type { Route } from '..'
import { Finance } from '../types'

export const routes = writable<Route[]>([
	{
		path: Finance.INDEX,
		icon: 'money-square',
		label: 'Finance',
	},

	{
		path: Finance.CASH_REQUESTS,
		icon: 'hand-money-linear',
		label: 'Cash Requests',
	},
])
