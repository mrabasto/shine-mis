import type { CashRequest } from './types'

export enum CashRequestEvent {
	CREATE = 'cashRequestCreate',
	EDIT = 'cashRequestEdit',
	ERROR = 'cashRequestError',
}

export interface CashRequestDispatch extends LoadingDispatch {
	[CashRequestEvent.CREATE]?: (payload: CashRequest) => void
	[CashRequestEvent.EDIT]?: (payload: CashRequest) => void
	[CashRequestEvent.ERROR]?: (payload: string) => void
}

export interface LoadingDispatch {
	toggleLoading?: () => boolean
}
