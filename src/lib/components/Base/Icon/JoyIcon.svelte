<script lang="ts">
	import type { UnplugIconName } from './Unplug'
	import { Size, Stroke, Fill, type IconName } from './types'

	let clazz = ''
	export { clazz as class }
	export let fill: Fill = Fill.NONE
	export let stroke: Stroke = Stroke.NEUTRAL
	export let size: Size = Size.MD
	export let icon: IconName | UnplugIconName = 'crown-circle'
	import { icons } from './types'
	import { icons as unplugIcons } from './Unplug'

	const iconSet = { ...icons, ...unplugIcons }

	$: iconClass = `${clazz} ${fill} ${stroke} ${size}`
</script>

<svelte:component this={iconSet[icon]} class={iconClass} />
