<script lang="ts">
	import Icon from '$lib/components/Advanced/Leaflet/Utils/Icon.svelte'
	import { Size, Stroke, Fill, type IconName } from './types'

	let clazz = ''
	export { clazz as class }
	export let fill: Fill = Fill.NONE
	export let stroke: Stroke = Stroke.NEUTRAL
	export let size: Size = Size.MD
	export let icon: IconName = 'cursor-pointer'
	import { icons } from './types'

	$: iconClass = `${clazz} ${fill} ${stroke} ${size}`
</script>

<svelte:component this={icons[icon]} class={iconClass} />
