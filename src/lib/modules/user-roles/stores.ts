import { writable } from 'svelte/store'
import type { Role } from './types'

export const currentUserRoles = writable<Array<Role>>()
