import { redirectIfNot } from '$lib/composables/usePermission.js'
import { App } from '$lib/modules/app'
import { authStore, user, type User } from '$lib/modules/authentication'

export const load = () => {
	const auth = App.getAuthStore()
	authStore.set(auth)
	user.set(auth.model as User)

	redirectIfNot(auth.isValid)
}
