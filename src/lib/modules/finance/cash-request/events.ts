import type { CashRequest } from './types'

export enum CashRequestEvent {
	CREATE = 'cash-request-create',
	ERROR = 'cash-request-error',
}

export interface CashRequestDispatch extends LoadingDispatch {
	[CashRequestEvent.CREATE]: CashRequest
	[CashRequestEvent.ERROR]: string
}

export interface LoadingDispatch {
	toggleLoading: () => boolean
}
