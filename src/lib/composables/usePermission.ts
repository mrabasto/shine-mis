import type { User } from '$lib/modules/auth/types'

import { goto } from '$app/navigation'
import { Home } from '$lib/types/Route'

// @TODO: expand with types
export default () => {
	const isAdmin = (user: User) => {
		if (!user.roles) return false

		return user.roles.some((role) => role.name == 'admin')
	}

	const hasRole = (user: User, role: string) => {
		if (!user.roles) return false

		return user.roles.some((userRole) => userRole.name == role)
	}

	type NoRedirectCallback = (() => void) | undefined
	const redirectIfNot = (
		flag: boolean,
		callback?: NoRedirectCallback,
		redirectUri = Home.INDEX
	): Promise<void> => {
		return new Promise((resolve) => {
			if (!flag) {
				resolve(goto(redirectUri, { replaceState: true }))
			}

			if (callback) {
				console.log('Ran callback')
				resolve(callback())
			}

			resolve()
		})
	}

	return {
		hasRole,
		isAdmin,
		redirectIfNot,
	}
}
