<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import type { Placement } from '@floating-ui/dom'
	import { onMount, tick } from 'svelte'
	import { fly } from 'svelte/transition'

	export let label = 'Tooltip'
	export let placement: Placement = 'right'
	let clazz = ''
	export { clazz as class }

	let target: HTMLDivElement,
		floater: HTMLDivElement,
		arrowElement: HTMLDivElement,
		transitionKey = false

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

	$: tooltipTargetClass = `${clazz} cursor-pointer`
	let xAxis = 10
	$: switch (placement) {
		case 'right':
		case 'right-start':
		case 'right-end':
			xAxis = -xAxis
			break
		case 'left':
		case 'left-start':
		case 'left-end':
			xAxis = xAxis
			break
	}

	onMount(async () => {
		update()
	})
</script>

<div
	on:mouseenter={show}
	on:mouseleave={hide}
	on:focus={show}
	on:blur={hide}
	bind:this={target}
	aria-describedby="tooltip"
	role="tooltip"
	class={tooltipTargetClass}
>
	<slot />
</div>

{#if transitionKey}
	<div
		bind:this={floater}
		id="tooltip"
		role="tooltip"
		in:fly={{ duration: 100, opacity: 1, x: xAxis }}
		out:fly={{ duration: 100, opacity: 0, x: xAxis }}
	>
		{#if !$$slots['tooltip-content']}
			{label}
		{:else}
			<slot name="tooltip-content" />
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
