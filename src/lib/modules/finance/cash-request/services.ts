import { pb } from '$lib/modules/authentication'
import {
	ApprovalStatus,
	type CashRequest,
	type CashRequestDto,
	type CashRequestItem,
} from './types'
import { createService } from '$lib/modules/base/services'
import { tryit } from 'radash'
import { cashRequests } from './stores'

const collection = 'cash_requests'
const service = createService<CashRequest>(collection)

const listCashRequests = (page = 1, limit = 30) => {
	return service.list(page, limit, {
		sort: '-created',
		expand: 'department,requested_by,approved_by',
	})
}

const createCashRequest = (items: CashRequestItem[]) => {
	const data: CashRequestDto = {
		requested_by: pb.authStore.model?.id,
		approval_status: ApprovalStatus.PENDING,
		items,
		total_amount: items.reduce((total, item) => {
			total += Number(item.price)
			return total
		}, 0),
	}

	return service.create(data)
}

const updateCashRequest = (id: string, items: CashRequestItem[]) => {
	const data: Partial<CashRequestDto> = {
		items,
		total_amount: items.reduce((total, item) => {
			total += Number(item.price)
			return total
		}, 0),
	}

	return service.update(id, data, {
		expand: 'department,requested_by,approved_by',
	})
}

const loadCashRequests = async () => {
	const [err, result] = await tryit(listCashRequests)()

	if (err) return err

	cashRequests.set(result.items)
}

export const cashRequestService = () => ({
	...service,
	createCashRequest,
	listCashRequests,
	loadCashRequests,
	updateCashRequest,
})
