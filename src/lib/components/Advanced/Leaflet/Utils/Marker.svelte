<script lang="ts">
	import L from 'leaflet'
	import { getContext, onDestroy, onMount, setContext } from 'svelte'
	import type { LayerContext, MapContext } from '../types'
	export let width: number
	export let height: number
	export let latLng: L.LatLngExpression

	let marker: L.Marker | undefined
	let markerElement: HTMLElement

	const { getMap } = getContext<MapContext>('map')
	const map = getMap()

	const createMarker = (map: L.Map) => {
		let icon = L.divIcon({
			html: markerElement,
			className: 'map-marker',
			iconSize: L.point(width, height),
		})

		return L.marker(latLng, { icon }).addTo(map)
	}

	setContext<LayerContext>('layer', {
		getMarker: createMarker,
	})

	onMount(() => {
		if (map) {
			marker = createMarker(map)
		}
	})

	onDestroy(() => {
		marker?.remove()
		marker = undefined
	})

	$: if (marker) {
		marker.setLatLng(latLng)
	}
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>
