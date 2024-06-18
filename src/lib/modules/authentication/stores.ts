import { env } from '$env/dynamic/public'
import Pocketbase, { type RecordAuthResponse } from 'pocketbase'
import { writable } from 'svelte/store'
import type { User } from './types'

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL)
export const user = writable<User>()
export const auth = writable<RecordAuthResponse<User>>()
