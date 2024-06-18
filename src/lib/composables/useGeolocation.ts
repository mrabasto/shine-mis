import type { LatLng } from '$lib/modules/bike-routes/types'
import type { Writable } from 'svelte/store'

import useSwal from './useSwal'
const { errorToast } = useSwal()

export default () => {
	const getLocation = (latLng: Writable<LatLng>) => {
		if (navigator.geolocation) {
			return navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords
				latLng.update(() => ({ lat: latitude, lng: longitude }))
			})
		}

		return errorToast('Geolocation is not supported by this browser.')
	}

	return {
		getLocation,
	}
}
