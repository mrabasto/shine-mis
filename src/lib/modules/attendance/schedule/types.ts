import type { RecordModel } from 'pocketbase'

export interface AttendanceSchedule extends RecordModel {
	user_id: string
	name: string
	start_time: string
	end_time: string
}

export interface AttendanceScheduleUser extends RecordModel {
	user_id: string
	schedule_id: string
}
