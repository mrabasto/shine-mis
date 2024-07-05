<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import { clickOutside } from '$lib/composables/useActions'
	import type { Placement } from '@floating-ui/dom'
	import { uid } from 'radash'
	import { onMount, tick } from 'svelte'
	import { fly } from 'svelte/transition'

	let clazz = ''
	export { clazz as class }
	export let floaterClass = ''
	export let placement: Placement = 'right'
	export let fitSize = false

	let target: HTMLDivElement, floater: HTMLDivElement, arrowElement: HTMLDivElement

	let floaterTargetId = 'floater-target-' + uid(10)
	let floaterId = 'floater-' + uid(10)

	let transitionKey = false

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

	onMount(async () => {
		update()
	})
</script>

<div bind:this={target} class={clazz} id={floaterTargetId}>
	<slot name="floater-target" {show} />
</div>

{#if transitionKey}
	<div
		bind:this={floater}
		id={floaterId}
		role="tooltip"
		class={floaterClass}
		use:clickOutside={[floaterTargetId]}
		on:outside={hide}
		in:fly={{ duration: 100, opacity: 1, y: 10 }}
		out:fly={{ duration: 100, opacity: 0, y: 10 }}
	>
		<slot name="floater-contents" {hide}><span>Contents go here</span></slot>
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
