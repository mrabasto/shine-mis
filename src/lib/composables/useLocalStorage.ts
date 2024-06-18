import { browser } from '$app/environment'

export default () => {
	const remove = (key: string) => {
		if (!browser) return false
		window.localStorage.removeItem(key)
		return true
	}

	const save = <T>(key: string, data: T) => {
		if (!browser) return false
		window.localStorage.setItem(key, JSON.stringify(data))
		return true
	}

	const load = <T>(key: string) => {
		if (!browser) return null
		const data = window.localStorage.getItem(key)
		if (!data) return null
		return JSON.parse(data) as T
	}

	return {
		save,
		load,
		remove,
	}
}
