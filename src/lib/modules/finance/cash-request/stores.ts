import { writable } from 'svelte/store'
import type { CashRequest } from './types'

export const cashRequests = writable<CashRequest[]>([])
export const selectedCashRequest = writable<CashRequest>()
