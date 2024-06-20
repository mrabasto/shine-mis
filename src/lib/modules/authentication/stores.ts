import { env } from '$env/dynamic/public'
import Pocketbase, { BaseAuthStore, type RecordAuthResponse } from 'pocketbase'
import { writable } from 'svelte/store'
import type { User } from './types'

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL)
export const user = writable<User>()
export const authResponse = writable<RecordAuthResponse<User>>()
export const authStore = writable<BaseAuthStore>()
