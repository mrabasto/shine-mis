import { getService, ServiceKey, setService } from '$lib/services/service'

export default () => {
	const get = <T>(key: ServiceKey) => {
		return getService<T>(key)()
	}

	const set = <T>(key: ServiceKey, service: T) => {
		return setService<T>(key, service)
	}

	return {
		get,
		set,
	}
}
