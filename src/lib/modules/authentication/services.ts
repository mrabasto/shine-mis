import type { RecordAuthResponse } from 'pocketbase'
import { pb } from './stores'
import { tick } from 'svelte'
import type { User } from './types'
import { App } from '$lib/routes/types'
import { goto } from '$app/navigation'

export async function signIn(
	username: string,
	password: string
): Promise<RecordAuthResponse<User>> {
	return new Promise((resolve, reject) => {
		pb.collection('users')
			.authWithPassword<User>(username, password)
			.then((response) => resolve(response))
			.catch((response) => reject({ response }))
	})
}

export async function signOut() {
	return new Promise((resolve) => {
		pb.authStore.clear()
		tick().then(() => resolve(goto(App.INDEX, { replaceState: true })))
	})
}
