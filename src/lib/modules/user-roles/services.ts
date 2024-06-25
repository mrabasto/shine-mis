import { pb, type User } from '$lib/modules/authentication'
import type { UserRole } from './types'

const collection = 'user_role'

export const getUserRoles = (user: User): Promise<UserRole> => {
	return new Promise((resolve, reject) => {
		pb.collection<UserRole>(collection)
			.getList(1, 30, {
				filter: `user_id = "${user.id}"`,
				expand: 'role_id',
			})
			.then((response) => resolve(response.items[0]))
			.catch((response) => reject(response))
	})
}
