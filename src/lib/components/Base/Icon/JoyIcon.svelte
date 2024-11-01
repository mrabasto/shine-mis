<script lang="ts">
	import type { UnplugIconName } from './Unplug'
	import { Size, Stroke, Fill } from './types'

	import { icons as unplugIcons } from './Unplug'
	interface Props {
		class?: string
		fill?: Fill
		stroke?: Stroke
		size?: Size
		icon?: UnplugIconName
	}

	let {
		class: clazz = '',
		fill = Fill.NONE,
		stroke = Stroke.TRANSPARENT,
		size = Size.MD,
		icon = 'crown-circle',
	}: Props = $props()

	const iconSet = { ...unplugIcons }

	let iconClass = $derived(`${clazz} ${fill} ${stroke} ${size}`)

	const SvelteComponent = $derived(iconSet[icon])
</script>

<SvelteComponent class={iconClass} />
