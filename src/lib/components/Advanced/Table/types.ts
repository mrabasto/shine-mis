import type { User } from '$lib/modules/auth/types'
import type { ThreadStatus } from '$lib/modules/thread/types'

export type ThreadDto = {
	content: string
	created_at?: string
	id?: string
	status?: ThreadStatus
	title: string
	user?: User
}
