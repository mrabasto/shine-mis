import type { RecordModel } from 'pocketbase'

export enum AttendanceLogType {
	REGULAR = 'regular',
	LEAVE = 'leave',
}

export interface AttendanceLog extends RecordModel {
	time_in: string
	time_out: string
	total_time: string
	type: AttendanceLogType
}
