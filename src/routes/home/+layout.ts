import { redirectIfNot } from '$lib/composables/usePermission.js'
import { App } from '$lib/modules/app'

export const load = () => {
	const auth = App.getAuthStore()
	redirectIfNot(auth.isValid)

	return { auth }
}
