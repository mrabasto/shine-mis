import { env } from '$env/dynamic/public'
import Pocketbase from 'pocketbase'
import { tick } from 'svelte'

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL)

export async function signIn(username: string, password: string) {
	return new Promise((resolve, reject) => {
		pb.collection('users')
			.authWithPassword(username, password)
			.then((response) => resolve({ response }))
			.catch((response) => reject({ response }))
	})
}

export async function signOut() {
	return new Promise((resolve) => {
		pb.authStore.clear()
		tick().then(() => resolve(true))
	})
}
