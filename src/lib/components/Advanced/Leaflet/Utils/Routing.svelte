<script lang="ts">
	import L, { LatLng } from 'leaflet'
	import { getContext, onMount } from 'svelte'
	import type { LayerContext, MapContext } from '../types'
	import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
	import 'leaflet-routing-machine'
	import { writable } from 'svelte/store'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'

	let router: L.Routing.Control | undefined
	let startMarkerElement: HTMLElement
	let otherMarker: HTMLElement
	let endMarkerElement: HTMLElement
	let markerPopup: HTMLElement
	type Waypoint = L.Routing.Waypoint

	const { getMap } = getContext<MapContext>('map')
	const { getIcon, getGeocoder } = getContext<LayerContext>('layer')
	const map = getMap()
	const waypoints = writable<Array<Waypoint>>([])
	const selectedMarker = writable<LatLng>()
	const selectedMarkerPopup = writable<L.Popup>()

	export let initialWaypoints: Array<LatLng> | undefined = undefined
	export let viewOnly = false

	export const getWaypoints = () => $waypoints
	export const setWaypoints = (waypoints: Array<LatLng>) => router?.setWaypoints(waypoints)

	const setAs = (mode: 'start' | 'end') => {
		if ($selectedMarker) {
			const index = $waypoints.findIndex((w: Waypoint) => w.latLng.equals($selectedMarker))

			if (mode === 'start') {
				$waypoints = index > -1 ? [$waypoints.splice(index, 1)[0], ...$waypoints] : $waypoints
			} else {
				$waypoints =
					index > -1
						? [
								...$waypoints.slice(0, index),
								...$waypoints.slice(index + 1),
								$waypoints.splice(index, 1)[0],
							]
						: $waypoints
			}

			$selectedMarkerPopup.close()
			router?.setWaypoints($waypoints)
		}
	}

	const removeMarker = () => {
		if ($selectedMarker) {
			$waypoints = [...$waypoints].filter((w: Waypoint) => !w.latLng.equals($selectedMarker))

			$selectedMarkerPopup.close()
			router?.setWaypoints($waypoints)
		}
	}

	onMount(() => {
		router = L.Routing.control({
			addWaypoints: !viewOnly,
			routeWhileDragging: !viewOnly,
			geocoder: getGeocoder ? getGeocoder() : undefined,
			// show: false,
			// @TODO: may need refactor
			createMarker: function (i: number, waypoint: Waypoint, nWps: number) {
				if (map) {
					if (getIcon) {
						let whatMarker = null

						if (i === 0) whatMarker = startMarkerElement.innerHTML
						else if (i === nWps - 1) whatMarker = endMarkerElement.innerHTML
						else whatMarker = otherMarker.innerHTML

						const icon = getIcon(whatMarker, 40, 40)
						const marker = L.marker(waypoint.latLng, {
							icon,
							draggable: !viewOnly,
						}).addTo(map)

						if (!viewOnly) {
							marker.on('click', (event) => {
								$selectedMarker = event.latlng
								$selectedMarkerPopup = L.popup()
									.setContent(markerPopup)
									.setLatLng($selectedMarker)
									.openOn(map)
							})
						}

						return marker
					}

					return false
				}
			},
		})

		router.on('waypointschanged', (event: any) => {
			waypoints.set(event.waypoints.filter((w: Waypoint) => w.latLng))
		})

		if (map) {
			router.addTo(map)

			if (!viewOnly) {
				map.on('click', function (e) {
					$waypoints = [...$waypoints, L.Routing.waypoint(e.latlng)].filter(
						(w: Waypoint) => w.latLng
					)
					router?.setWaypoints([...$waypoints])
				})
			}
		}

		if (initialWaypoints) {
			router.setWaypoints(initialWaypoints)
		}
	})
</script>

<div class="relative">
	<div class="bg-base-200 absolute inset-0"></div>

	<div bind:this={startMarkerElement}>
		<slot name="start-marker" />
	</div>
	<div bind:this={otherMarker}>
		<slot name="other-marker" />
	</div>
	<div bind:this={endMarkerElement}>
		<slot name="end-marker" />
	</div>

	<div class="flex gap-2 -z-50" bind:this={markerPopup}>
		<JoyButton variant={ButtonVariant.PRIMARY} size={ButtonSize.SM} on:click={() => setAs('start')}
			>Set as Start</JoyButton
		>
		<JoyButton variant={ButtonVariant.SUCCESS} size={ButtonSize.SM} on:click={() => setAs('end')}
			>Set as End</JoyButton
		>
		<JoyButton variant={ButtonVariant.ERROR} size={ButtonSize.SM} on:click={removeMarker}
			>Remove</JoyButton
		>
	</div>
</div>
