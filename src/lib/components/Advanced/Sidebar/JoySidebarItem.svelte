<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size, type IconName } from '$lib/components/Base/Icon/types'

	export let icon: IconName | UnplugIconName

	let clazz = ''
	export { clazz as class }
	export let href = '#'

	$: itemClass = `w-full px-4 py-2 hover:bg-secondary/25 hover:text-primary transition-colors 
		rounded-lg flex justify-center overflow-hidden ${clazz}`
</script>

<a {href} class={itemClass}>
	<JoyIcon {icon} size={Size.XL} />
</a>
