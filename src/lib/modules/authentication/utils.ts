import { page } from '$app/stores'
import { authStore, user } from './stores'

export const registerLoggers = () => {
	page.subscribe((p) => {
		console.log('Route id', p.route?.id)
	})

	authStore.subscribe((value) => {
		console.log('authStore value has changed to', { value })
	})

	user.subscribe((value) => {
		console.log('user value has changed to', { value })
	})
}
