import { createService } from '$lib/modules/base/services'
import { tryit } from 'radash'
import type { AttendanceSchedule, AttendanceScheduleUser } from './types'
import { attendanceScheduleUsers, attendanceSchedules } from './stores'
import type { User } from '$lib/modules/authentication'
import type { RecordListOptions } from 'pocketbase'

const collection = 'attendance_schedules'
const collection_scheduleUser = 'attendance_schedule_users'
const service = createService<AttendanceSchedule>(collection)
const service_scheduleUser = createService<AttendanceScheduleUser>(
	collection_scheduleUser
)

const loadAttendanceSchedules = async (page = 1, limit = 30) => {
	const options = {
		expand: 'user_id',
	}

	const [err, result] = await tryit(service.list)(page, limit, options)

	if (err) return err

	attendanceSchedules.set(result.items)
}

const loadAttendanceScheduleUsers = async (user?: User, page = 1, limit = 30) => {
	const options: RecordListOptions = {}

	if (user) {
		options.filter = `user_id = '${user.id}'`
	}

	const [err, result] = await tryit(service_scheduleUser.list)(page, limit, options)

	if (err) return err

	attendanceScheduleUsers.set(result.items)
}

export const attendanceScheduleService = () => ({
	...service,
	loadAttendanceSchedules,
})

export const attendanceScheduleUsersService = () => ({
	...service_scheduleUser,
	loadAttendanceScheduleUsers,
})
