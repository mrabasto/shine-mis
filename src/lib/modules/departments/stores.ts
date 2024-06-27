import { writable } from 'svelte/store'
import type { Department } from './types'

export const departments = writable<Array<Department>>()
