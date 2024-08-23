export enum App {
	INDEX = '/',
}

export enum Home {
	ATTENDANCE = '/home/attendance',
	FINANCE = '/home/finance',
	INDEX = '/home',
	SSP = '/home/shine-school',
}

export enum Attendance {
	INDEX = `${Home.ATTENDANCE}`,
}

export enum Finance {
	INDEX = `${Home.FINANCE}`,
	CASH_REQUESTS = `${Home.FINANCE}/cash-request`,
}

export enum ShineSchool {
	INDEX = `${Home.SSP}/`,
}
