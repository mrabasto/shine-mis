<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import type { Placement } from '@floating-ui/dom'
	import { onMount, tick, type Snippet } from 'svelte'
	import { fly } from 'svelte/transition'

	interface Props {
		children: Snippet
		tooltipContent?: Snippet
		label?: string
		placement?: Placement
		class?: string
	}

	let {
		label = 'tooltip',
		placement = 'right',
		class: clazz = '',
		children,
		tooltipContent,
	}: Props = $props()

	let floater = $state<HTMLDivElement>(),
		target = $state<HTMLDivElement>(),
		arrowElement = $state<HTMLDivElement>(),
		transitionKey = $state(false)

	const show = async () => {
		transitionKey = true
		await tick()
		update()
	}

	const hide = () => {
		transitionKey = false
	}

	const update = () =>
		floating({
			target,
			floater,
			arrowElement,
			placement,
		})

	let tooltipTargetClass = $derived(`${clazz} cursor-pointer`)

	let xAxis = $derived(
		(() => {
			switch (placement) {
				case 'right':
				case 'right-start':
				case 'right-end':
					return -10
				case 'left':
				case 'left-start':
				case 'left-end':
					return 10
			}

			return 10
		})()
	)

	onMount(async () => {
		update()
	})
</script>

<div
	onmouseenter={show}
	onmouseleave={hide}
	onfocus={show}
	onblur={hide}
	bind:this={target}
	aria-describedby="tooltip"
	role="tooltip"
	class={tooltipTargetClass}
>
	{@render children()}
</div>

{#if transitionKey}
	<div
		bind:this={floater}
		id="tooltip"
		role="tooltip"
		in:fly={{ duration: 100, opacity: 1, x: xAxis }}
		out:fly={{ duration: 100, opacity: 0, x: xAxis }}
	>
		{#if tooltipContent}
			{@render tooltipContent()}
		{:else}
			{label}
		{/if}
		<div bind:this={arrowElement} id="arrow"></div>
	</div>
{/if}

<style lang="postcss">
	#tooltip {
		@apply bg-neutral text-neutral-content px-4 py-2 rounded-lg text-sm font-bold;
		@apply absolute w-max top-0 left-0 z-[100];
	}

	#arrow {
		@apply absolute bg-neutral w-[8px] h-[8px];
		transform: rotate(45deg);
	}
</style>
