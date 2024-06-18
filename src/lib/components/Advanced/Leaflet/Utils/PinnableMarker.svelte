<script lang="ts">
	import L from 'leaflet'
	import { getContext, onDestroy, onMount, setContext } from 'svelte'
	import type { LayerContext, MapContext } from '../types'
	export let width: number
	export let height: number

	let marker: L.Marker | undefined
	let markerElement: HTMLElement

	const { getMap } = getContext<MapContext>('map')
	const map = getMap()

	const createMarker = (e: L.LeafletMouseEvent) => {
		let icon = L.divIcon({
			html: markerElement,
			className: 'map-marker',
			iconSize: L.point(width, height),
		})

		marker = L.marker(e.latlng, { icon })

		if (map) {
			console.log('====================================')
			console.log('add Pin')
			console.log('====================================')

			marker.addTo(map)
		}
	}

	onMount(() => {
		if (map) {
			map.on('click', (e) => createMarker(e))
		}
	})

	onDestroy(() => {
		marker?.remove()
		marker = undefined
	})

	export function getLocation() {
		if (marker) {
			return marker.getLatLng()
		}
	}
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>
