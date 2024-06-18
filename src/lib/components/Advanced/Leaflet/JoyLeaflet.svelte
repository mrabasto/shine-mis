<script lang="ts">
	import type { Map } from 'leaflet'
	import L from 'leaflet'
	import 'leaflet/dist/leaflet.css'
	import { onDestroy, onMount, setContext } from 'svelte'
	import type { LayerContext, MapContext } from './types'

	let map: Map | undefined
	let mapElement: HTMLElement

	export let bounds: L.LatLngBoundsExpression | undefined = undefined
	export let view: L.LatLngExpression | undefined = undefined
	export let zoom: number | undefined = undefined

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('must set either bounds, or view and zoom')
		}

		map = L.map(mapElement)

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			minZoom: 0,
			maxZoom: 20,
			subdomains: 'abcd',
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		}).addTo(map)
	})

	onDestroy(() => {
		map?.remove()
		map = undefined
	})

	setContext<MapContext>('map', {
		getMap: () => map,
	})

	setContext<LayerContext>('layer', {
		getMarker: () => undefined,
	})

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds)
		}

		if (view) {
			map.setView(view, zoom)
		}
	}
</script>

<div class="w-full h-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
