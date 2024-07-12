import type { User } from '$lib/modules/authentication'
import { createService } from '$lib/modules/base/services'
import { tryit } from 'radash'
import { users } from './stores'

const collection = 'users'
const service = createService<User>(collection)

const loadUsers = async () => {
	const [err, result] = await tryit(service.list)()

	if (err) return err

	users.set(result.items)
}

export const userService = () => ({
	...service,
	loadUsers,
})
