import type { RecordListOptions, RecordModel } from 'pocketbase'
import { pb } from '$lib/modules/authentication/'

export const createService = <T = RecordModel,>(collection: string) => {
	const list = (page: number = 1, limit = 30, options: RecordListOptions = {}) =>
		pb.collection<T>(collection).getList(page, limit, options)

	const create = (dto: Partial<T>) => pb.collection<T>(collection).create(dto)

	return {
		create,
		list,
	}
}
