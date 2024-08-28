import { writable } from 'svelte/store'
import type { AttendanceSchedule, AttendanceScheduleUser } from './types'

export const attendanceSchedules = writable<Array<AttendanceSchedule>>()
export const attendanceScheduleUsers = writable<Array<AttendanceScheduleUser>>()
