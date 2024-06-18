<script lang="ts">
	import L from 'leaflet'
	import { getContext, onDestroy, onMount, setContext } from 'svelte'
	import type { LayerContext, MapContext } from '../types'
	export let width: number | undefined = undefined
	export let height: number | undefined = undefined
	let clazz = ''
	export { clazz as class }
	export let iconClass = 'leaflet-custom-icon'
	$: computedClass = `${iconClass} ${clazz}`

	let icon: L.DivIcon
	let iconElement: HTMLElement

	const { getMap } = getContext<MapContext>('map')
	const map = getMap()

	const createIcon = (element: HTMLElement | string, width: number, height: number) =>
		L.divIcon({
			html: element,
			className: iconClass,
			iconSize: L.point(width, height),
		})

	setContext<LayerContext>('layer', {
		getIcon: createIcon,
		getIconInstance: () => icon,
		getDuplicateIconElement: () => iconElement.cloneNode(true),
	})

	onMount(() => {
		if (map) {
			if (width && height) {
				icon = createIcon(iconElement, width, height)
			}
		}
	})

	onDestroy(() => {
		icon?.remove()
	})
</script>

<div bind:this={iconElement} class={computedClass}>
	{#if icon}
		<slot name="icon" />
	{/if}
</div>

<slot />
