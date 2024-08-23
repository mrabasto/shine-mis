import { writable } from 'svelte/store'
import type { AttendanceLog } from './types'

export const attendanceLogs = writable<Array<AttendanceLog>>()
