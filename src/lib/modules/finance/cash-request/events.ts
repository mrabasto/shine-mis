import type { CashRequest } from './types'

export enum CashRequestEvent {
	CREATE = 'cash-request-create',
	EDIT = 'cash-request-edit',
	ERROR = 'cash-request-error',
}

export interface CashRequestDispatch extends LoadingDispatch {
	[CashRequestEvent.CREATE]: CashRequest
	[CashRequestEvent.EDIT]: CashRequest
	[CashRequestEvent.ERROR]: string
}

export interface LoadingDispatch {
	toggleLoading: () => boolean
}
