<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size, type IconName } from '$lib/components/Base/Icon/types'
	import type { Route } from '$lib/routes'

	export let icon: IconName | UnplugIconName = 'crown-circle'

	let clazz = ''
	export { clazz as class }
	export let href: string = '#'
	export let type: 'a' | 'container' | 'button' = 'a'

	$: itemClass = `w-full p-4 gap-2
		transition-colors flex items-center ${!$$slots['label'] && 'justify-center'}
		overflow-hidden group ${clazz}`
</script>

{#if type === 'a'}
	<a {href} class={itemClass} on:click>
		<JoyIcon {icon} size={Size.LG} />
		<slot name="label" />
	</a>
{:else if type === 'container'}
	<button class={itemClass} on:click>
		<slot />
	</button>
{:else}
	<button class={itemClass} on:click>
		<JoyIcon {icon} size={Size.LG} />
		<slot name="label" />
	</button>
{/if}
