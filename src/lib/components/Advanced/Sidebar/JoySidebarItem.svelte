<script lang="ts">
	import { createBubbler } from 'svelte/legacy'

	const bubble = createBubbler()
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size } from '$lib/components/Base/Icon/types'

	interface Props {
		icon?: UnplugIconName
		class?: string
		href?: string
		type?: 'a' | 'container' | 'button'
		active?: boolean
		label?: import('svelte').Snippet
		children?: import('svelte').Snippet
	}

	let {
		icon = 'crown-circle',
		class: clazz = '',
		href = '#',
		type = 'a',
		active = false,
		label,
		children,
	}: Props = $props()

	let itemClass = $derived(`w-full gap-4
		transition-colors flex items-center ${!label && 'justify-center'}
		overflow-hidden group ${active && 'bg-accent/25 text-primary'} ${clazz}`)
</script>

{#if type === 'a'}
	<a {href} class={itemClass} onclick={bubble('click')}>
		<JoyIcon {icon} size={Size.LG} />
		{@render label?.()}
	</a>
{:else if type === 'container'}
	<button class={itemClass} onclick={bubble('click')}>
		{@render children?.()}
	</button>
{:else}
	<button class={itemClass} onclick={bubble('click')}>
		<JoyIcon {icon} size={Size.LG} />
		{@render label?.()}
	</button>
{/if}
