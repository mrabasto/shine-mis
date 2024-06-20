export enum Home {
	FINANCE = '/home/finance',
	INDEX = '/home',
	SSP = '/home/shine-school',
}

export enum Finance {
	INDEX = `${Home.FINANCE}`,
	CASH_REQUESTS = `${Home.FINANCE}/cash-request`,
}

export enum ShineSchool {
	INDEX = `${Home.SSP}/`,
}
