import { goto } from '$app/navigation'
import { user, type User } from '$lib/modules/authentication'
import { App } from '$lib/routes/types'
import { get } from 'svelte/store'

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
