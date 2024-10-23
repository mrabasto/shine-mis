<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size } from '$lib/components/Base/Icon/types'

	export let icon: UnplugIconName = 'crown-circle'

	let clazz = ''
	export { clazz as class }
	export let href: string = '#'
	export let type: 'a' | 'container' | 'button' = 'a'
	export let active = false

	$: itemClass = `w-full gap-4
		transition-colors flex items-center ${!$$slots['label'] && 'justify-center'}
		overflow-hidden group ${active && 'bg-accent/25 text-primary'} ${clazz}`
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
