import { pb } from '$lib/modules/authentication'
import type { ListResult } from 'pocketbase'
import {
	ApprovalStatus,
	type CashRequest,
	type CashRequestDto,
	type CashRequestItem,
} from './types'

const collection = 'cash_requests'

export const getCashRequests = (page: number = 1): Promise<ListResult<CashRequest>> => {
	return new Promise((resolve, reject) => {
		pb.collection<CashRequest>(collection)
			.getList(page, 30, {
				sort: '-created',
				expand: 'requested_by,approved_by',
			})
			.then((response) => resolve(response))
			.catch((response) => reject(response))
	})
}

export const createCashRequest = (items: CashRequestItem[]): Promise<CashRequest> => {
	return new Promise((resolve, reject) => {
		const data: CashRequestDto = {
			requested_by: pb.authStore.model?.id,
			approval_status: ApprovalStatus.PENDING,
			items,
		}

		pb.collection<CashRequest>('cash_requests')
			.create(data)
			.then((response) => resolve(response))
			.catch((response) => reject(response))
	})
}
