import { writable } from 'svelte/store'

export const currentUserRoles = writable<Array<unknown>>()
