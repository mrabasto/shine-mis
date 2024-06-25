import type { RecordModel } from 'pocketbase'

export interface User extends RecordModel {
	avatar: string
	email: string
	emailVisibility: boolean
	name: string
	verified: boolean
}
