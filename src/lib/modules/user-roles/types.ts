import type { RecordModel } from 'pocketbase'

export enum Roles {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
}

export interface Role extends RecordModel {
	name: Roles
	is_active: boolean
}

export interface UserRole extends RecordModel {
	user_id: string
	role_id: Array<string>
	expand?: { role_id: Array<Role> }
}
