import { pb } from '$lib/modules/authentication'
import type { ListResult } from 'pocketbase'
import type { CashRequest } from './types'

const collection = 'cash_requests'

export const getCashRequests = (page: number = 1): Promise<ListResult<CashRequest>> => {
	return new Promise((resolve, reject) => {
		pb.collection<CashRequest>(collection)
			.getList(page, 30, {
				expand: 'requested_by,approved_by',
			})
			.then((response) => resolve(response))
			.catch((response) => reject(response))
	})
}
