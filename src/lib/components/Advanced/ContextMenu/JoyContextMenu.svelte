<script lang="ts">
	import JoyFloater from '$lib/components/Advanced/Floater/JoyFloater.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { BorderRounded, ContainerGap, ContainerPadding, Shadow } from '$lib/types'
	import { type Placement } from '@floating-ui/dom'
	import type { Snippet } from 'svelte'

	interface Props {
		class?: string
		placement?: Placement
		fitSize?: boolean
		contentsClass?: string
		contextTarget: Snippet<[() => Promise<void>]>
		contextContents: Snippet<[() => Promise<void>]>
	}

	let {
		class: clazz = '',
		placement = 'top-end',
		fitSize = false,
		contentsClass = '',
		contextTarget,
		contextContents,
	}: Props = $props()

	let contextContentsClass = $derived(`p-2 min-w-[200px] max-w-full ${contentsClass}`)
</script>

<JoyFloater class={clazz} {placement} {fitSize}>
	{#snippet floaterTarget(show)}
		{@const showContextMenu = show}
		{@render contextTarget(showContextMenu)}
	{/snippet}

	{#snippet floaterContents(hide)}
		<JoyContainer
			col
			gap={ContainerGap.XXS}
			rounded={BorderRounded.LG}
			padding={ContainerPadding.NONE}
			class={contextContentsClass}
			shadow={Shadow.XL}
		>
			{@const hideContextMenu = hide}
			{@render contextContents(hideContextMenu)}
		</JoyContainer>
	{/snippet}
</JoyFloater>
