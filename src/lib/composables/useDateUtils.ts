import { DateTime } from 'luxon'
const format = 'YYYY-MM-DD'
export const dateFromFormat = (date: string) => {
	const _fmt = DateTime.fromFormat(date.split(' ')[0], format)
	// console.log({ fmt })
	return date
}
