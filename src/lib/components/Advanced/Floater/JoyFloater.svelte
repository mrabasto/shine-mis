<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import { clickOutside } from '$lib/composables/useActions'
	import type { Placement } from '@floating-ui/dom'
	import { uid } from 'radash'
	import { onMount, tick, type Snippet } from 'svelte'
	import { fly } from 'svelte/transition'

	interface Props {
		class?: string
		floaterClass?: string
		placement: Placement
		fitSize: boolean
		target?: HTMLDivElement
		floater?: HTMLDivElement
		floaterTarget?: Snippet<[() => Promise<void>]>
		floaterContents?: Snippet<[() => Promise<void>]>
		arrowElement?: HTMLDivElement
	}

	let {
		class: clazz = '',
		floater,
		floaterClass = '',
		floaterTarget,
		floaterContents,
		fitSize,
		arrowElement,
		placement,
		target,
	}: Props = $props()

	let floaterTargetId = $derived('floater-target-' + uid(10))
	let floaterId = $derived('floater-' + uid(10))

	let transitionKey = $state(false)

	const show = async () => {
		transitionKey = true
		await tick()
		update()
	}

	const hide = async () => {
		transitionKey = false
	}

	const update = () =>
		floating(
			{
				target,
				floater,
				arrowElement,
				placement,
			},
			fitSize
		)

	onMount(update)
</script>

<div bind:this={target} class={clazz} id={floaterTargetId}>
	{@render floaterTarget(show)}
</div>

{#if transitionKey}
	<div
		bind:this={floater}
		id={floaterId}
		role="tooltip"
		class={floaterClass}
		use:clickOutside={[floaterTargetId]}
		onoutside={hide}
		in:fly={{ duration: 100, opacity: 1, y: 10 }}
		out:fly={{ duration: 100, opacity: 0, y: 10 }}
	>
		{#if floaterContents}
			{@render floaterContents(hide)}
		{:else}
			<span>Contents go here</span>
		{/if}
		<div bind:this={arrowElement} id="arrow"></div>
	</div>
{/if}

<style lang="postcss">
	[role='tooltip'] {
		@apply absolute w-max top-0 left-0 z-[100];
	}

	#arrow {
		@apply absolute w-[8px] h-[8px];
		transform: rotate(45deg);
	}
</style>
