import type { User } from '$lib/modules/authentication'
import type { RecordModel } from 'pocketbase'

export interface CashRequest extends RecordModel {
	approved_by: string
	approval_status: 'pending' | 'approved' | 'declined'
	created: string
	expand?: { requested_by: User; approved_by: User }
	id: string
	request_by: string
	request_status: 'cancelled' | 'received'
	updated: string
}
