import { DateTime } from 'luxon'
const format = 'yyyy LLL dd'

export const dateFromISO = (date: string) => {
	const tDate = date.split(' ').join('T')
	const fmt = DateTime.fromISO(tDate)
	return fmt
}

export const commonFormat = (date: string) => {
	return dateFromISO(date).toFormat(format)
}

export const createTimer = (interval: number = 1000, callback: CallableFunction) => {
	const timer = setInterval(callback, interval)

	return {
		clearTimer: () => clearInterval(timer),
	}
}
