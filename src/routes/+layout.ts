import { getAuthStore } from '$lib/modules/app'
import { authStore, user, type User } from '$lib/modules/authentication'
import { registerLoggers } from '$lib/modules/authentication/utils'

export const ssr = false

export const load = () => {
	const auth = getAuthStore()
	registerLoggers()
	authStore.set(auth)
	user.set(auth.model as User)
}
