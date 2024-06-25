<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import { clickOutside } from '$lib/composables/useActions'
	import type { Placement } from '@floating-ui/dom'
	import { onMount } from 'svelte'

	let clazz = ''
	export { clazz as class }
	export let floaterClass = ''
	export let placement: Placement = 'right'
	let target: HTMLDivElement, floater: HTMLDivElement, arrowElement: HTMLDivElement

	const show = () => {
		floater.style.display = 'block'
		update()
	}

	const hide = () => {
		floater.style.display = ''
	}

	const update = () =>
		floating({
			target,
			floater,
			arrowElement,
			placement,
		})

	onMount(async () => {
		update()
	})
</script>

<div bind:this={target} class={clazz}>
	<slot name="floater-target" {show} />
</div>

<div
	bind:this={floater}
	id="floater"
	role="tooltip"
	class={floaterClass}
	use:clickOutside
	on:outside={hide}
>
	<slot name="floater-contents">
		<span>Contents go here</span>
	</slot>
	<div bind:this={arrowElement} id="arrow"></div>
</div>

<style lang="postcss">
	#floater {
		@apply hidden absolute w-max top-0 left-0;
	}

	#arrow {
		@apply absolute w-[8px] h-[8px];
		transform: rotate(45deg);
	}
</style>
