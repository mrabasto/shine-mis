<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size } from '$lib/components/Base/Icon/types'
	import type { Snippet } from 'svelte'

	interface Props {
		icon?: UnplugIconName
		class?: string
		href?: string
		type?: 'a' | 'container' | 'button'
		active?: boolean
		label?: Snippet
		children?: Snippet
		onclick: (event: MouseEvent) => void
	}

	let {
		icon = 'crown-circle',
		class: clazz = '',
		href = '#',
		type = 'a',
		active = false,
		label,
		children,
		onclick,
	}: Props = $props()

	let itemClass = $derived(`w-full gap-4
		transition-colors flex items-center ${!label && 'justify-center'}
		overflow-hidden group ${active && 'bg-accent/25 text-primary'} ${clazz}`)
</script>

{#if type === 'a'}
	<a {href} class={itemClass} {onclick}>
		<JoyIcon {icon} size={Size.LG} />
		{@render label?.()}
	</a>
{:else if type === 'container'}
	<button class={itemClass} {onclick}>
		{@render children?.()}
	</button>
{:else}
	<button class={itemClass} {onclick}>
		<JoyIcon {icon} size={Size.LG} />
		{@render label?.()}
	</button>
{/if}
