import { createService } from '$lib/modules/base/services'
import { DateTime } from 'luxon'
import type { User } from '../authentication'
import { attendanceLogs } from './stores'
import { AttendanceLogType, type AttendanceLog } from './types'
import { tryit } from 'radash'
import { dateFromISO } from '$lib/composables/useDateUtils'

const collection = 'attendance_logs'
const service = createService<AttendanceLog>(collection)

const loadAttendanceLogs = async () => {
	const [err, result] = await tryit(service.list)()

	if (err) return err

	attendanceLogs.set(result.items)
}

const createAttendanceLog = (
	user: User,
	type: AttendanceLogType = AttendanceLogType.REGULAR
) => {
	const data: Partial<AttendanceLog> = {
		user_id: user.id,
		time_in: DateTime.now().toUTC().toISO(),
		type,
	}

	return service.create(data)
}

const timeOutAttendanceLog = async (user: User) => {
	const date = DateTime.now().toUTC().toFormat('LL-dd')

	const [err, result] = await tryit(service.first)(`time_in ?~ '${date}'`)

	if (err) return err

	const attendanceLog: AttendanceLog = result
	const timeIn = dateFromISO(attendanceLog.time_in)
	const timeOut = DateTime.now().toUTC().toISO()
	const diff = timeIn.diffNow(['hour', 'minute'])
	const diffHours = diff.hours
	const diffMinutes = Math.abs(Math.round(diff.minutes))
	const totalTime = diffHours + diffMinutes / 60

	const [updateErr, updateResult] = await tryit(service.update)(result.id, {
		time_out: timeOut,
		total_time: (Math.round(totalTime * 100) / 100).toString(),
	})

	if (updateErr) return updateErr
	return updateResult
}

export const attendanceService = () => ({
	...service,
	createAttendanceLog,
	loadAttendanceLogs,
	timeOutAttendanceLog,
})
