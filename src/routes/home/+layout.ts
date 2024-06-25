import { redirectIfNot } from '$lib/composables/usePermission.js'
import { getAuthStore } from '$lib/modules/app'
import { authStore, user, type User } from '$lib/modules/authentication'

export const load = () => {
	const auth = getAuthStore()
	authStore.set(auth)
	user.set(auth.model as User)

	redirectIfNot(auth.isValid)
}
