<script lang="ts">
	import 'leaflet-control-geocoder'
	import { setContext } from 'svelte'
	import type { LayerContext } from '../types'
	import { Geocoder, geocoders } from 'leaflet-control-geocoder'

	const geocoder = new Geocoder({
		geocoder: new geocoders.Nominatim(),
		position: 'topleft',
	})

	setContext<LayerContext>('layer', {
		getGeocoder: () => geocoder,
	})
</script>

<slot />
