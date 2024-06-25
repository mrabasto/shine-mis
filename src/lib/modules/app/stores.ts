import { pb } from '$lib/modules/authentication'
import { writable } from 'svelte/store'

export namespace App {
	export const getAuthStore = () => pb.authStore
	export const isLoading = writable(false)
}
