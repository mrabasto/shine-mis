import { DateTime } from 'luxon'
const format = 'yyyy LLL dd'
export const dateFromISO = (date: string) => {
	const [tDate, _time] = date.split(' ')
	const fmt = DateTime.fromISO(tDate)
	return fmt
}

export const commonFormat = (date: string) => {
	return dateFromISO(date).toFormat(format)
}
