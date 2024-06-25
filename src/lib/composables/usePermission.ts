import { goto } from '$app/navigation'
import { user, type User } from '$lib/modules/authentication'
import { App } from '$lib/routes/types'
import { get } from 'svelte/store'

// @TODO: expand with types
export default () => {}

export const isAdmin = (user: User) => {
	if (!user.roles) return false

	return user.roles.some((role) => role.name == 'admin')
}

export const hasRole = (user: User, role: string) => {
	if (!user.roles) return false

	return user.roles.some((userRole) => userRole.name == role)
}

export type NoRedirectCallback = ((user: User) => void) | undefined

export interface RedirectOptions {
	noRedirectCb?: NoRedirectCallback
	uri: string
}

export const redirectIfNot = (
	flag: boolean,
	redirectOptions: RedirectOptions = {
		uri: App.INDEX,
	}
): Promise<void> => {
	return new Promise((resolve) => {
		if (!flag) {
			resolve(goto(redirectOptions.uri, { replaceState: true }))
		}

		if (redirectOptions.noRedirectCb) {
			resolve(redirectOptions.noRedirectCb(get(user)))
		}

		resolve()
	})
}
