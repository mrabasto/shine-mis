import type { RecordModel } from 'pocketbase'

export interface Role extends RecordModel {
	name: string
	is_active: boolean
}

export interface UserRole extends RecordModel {
	user_id: string
	role_id: Array<string>
}
