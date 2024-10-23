<script lang="ts">
	import type { UnplugIconName } from './Unplug'
	import { Size, Stroke, Fill } from './types'

	let clazz = ''
	export { clazz as class }
	export let fill: Fill = Fill.NONE
	export let stroke: Stroke = Stroke.TRANSPARENT
	export let size: Size = Size.MD
	export let icon: UnplugIconName = 'crown-circle'
	import { icons as unplugIcons } from './Unplug'

	const iconSet = { ...unplugIcons }

	$: iconClass = `${clazz} ${fill} ${stroke} ${size}`
</script>

<svelte:component this={iconSet[icon]} class={iconClass} />
