import type { RecordModel } from 'pocketbase'

export enum AttendanceLogType {
	REGULAR = 'regular',
	LEAVE = 'leave',
}

export interface AttendanceLog extends RecordModel {
	hours_late: number
	schedule_id: string
	time_in: string
	time_out: string
	total_time: number
	type: AttendanceLogType
	user_id: string
}
