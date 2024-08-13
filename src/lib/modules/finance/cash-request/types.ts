import type { User } from '$lib/modules/authentication'
import type { Department } from '$lib/modules/departments'
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
	total_amount: number
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
	expand?: { requested_by: User; approved_by: User; department: Department }
	items: CashRequestItem[]
	total_amount: number
	requested_by: string
	request_status: RequestStatus
}
