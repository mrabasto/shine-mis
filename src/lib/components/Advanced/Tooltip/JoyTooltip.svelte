<script lang="ts">
	import { floating } from '$lib/components/Advanced/Tooltip/composables/useFloating'
	import { onMount } from 'svelte'

	export let label = 'Tooltip'
	let clazz = ''
	export { clazz as class }

	let button: HTMLDivElement, tooltip: HTMLDivElement, arrowElement: HTMLDivElement

	const show = () => {
		tooltip.style.display = 'block'
		update(button, tooltip, arrowElement)
	}

	const hide = () => {
		tooltip.style.display = ''
	}

	const update = (target: HTMLElement, floater: HTMLElement, arrowElement: HTMLElement) =>
		floating({
			target,
			floater,
			arrowElement,
			placement: 'right',
		})

	onMount(async () => {
		update(button, tooltip, arrowElement)
	})
</script>

<div
	on:mouseenter={show}
	on:mouseleave={hide}
	on:focus={show}
	on:blur={hide}
	bind:this={button}
	aria-describedby="tooltip"
	role="tooltip"
	class={clazz}
>
	<slot />
</div>

<div bind:this={tooltip} id="tooltip" role="tooltip">
	{label}
	<div bind:this={arrowElement} id="arrow"></div>
</div>

<style lang="postcss">
	#tooltip {
		@apply bg-neutral text-neutral-content px-4 py-2 rounded-lg text-sm font-bold;
		@apply hidden absolute w-max top-0 left-0;
	}

	#arrow {
		@apply absolute bg-neutral w-[8px] h-[8px];
		transform: rotate(45deg);
	}
</style>
