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

export enum ApprovalStatus {
	APPROVED = 'approved',
	DECLINED = 'declined',
	PENDING = 'pending',
}

export enum RequestStatus {
	CANCELLED = 'cancelled',
	RECEIVED = 'received',
}

export interface CashRequest extends RecordModel {
	approved_by: string
	approval_status: ApprovalStatus
	created: string
	expand?: { requested_by: User; approved_by: User }
	id: string
	items: CashRequestItem[]
	requested_by: string
	request_status: RequestStatus
	updated: string
}
