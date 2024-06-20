import type { User } from '$lib/modules/authentication'
import type { RecordModel } from 'pocketbase'

export interface CashRequestItem {
	id: string
	label: string
	price: number
}

export interface CashRequestDto {
	items: CashRequestItem[]
	requested_by: string
	approval_status: ApprovalStatus
}

type ApprovalStatus = 'pending' | 'approved' | 'declined'

export interface CashRequest extends RecordModel {
	approved_by: string
	approval_status: ApprovalStatus
	created: string
	expand?: { requested_by: User; approved_by: User }
	id: string
	requested_by: string
	request_status: 'cancelled' | 'received'
	updated: string
}
