<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size, type IconName } from '$lib/components/Base/Icon/types'

	export let icon: IconName | UnplugIconName

	let clazz = ''
	export { clazz as class }
	export let href = '#'

	$: itemClass = `w-full p-4 gap-2 
		transition-colors flex items-center
		overflow-hidden group ${clazz}`
</script>

<a {href} class={itemClass} on:click>
	<JoyIcon {icon} size={Size.XL} />
	<slot name="label" />
</a>
