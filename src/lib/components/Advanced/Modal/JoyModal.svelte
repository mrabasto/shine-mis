<script lang="ts">
	import { clickMe } from '$lib/composables/useActions'
	import { teleport } from '$lib/components/Advanced/Toast'
	import { fade, fly } from 'svelte/transition'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { BorderRounded, ContainerPadding } from '$lib/types'

	interface Props {
		isShown?: boolean
		blocked?: boolean
		target?: string
		hide?: () => void
		children?: import('svelte').Snippet
	}

	let {
		isShown = $bindable(false),
		blocked = false,
		target = 'shell',
		hide = () => {
			isShown = false
		},
		children,
	}: Props = $props()

	let divClass =
		$derived(`${isShown ? 'flex justify-center' : 'hidden'} ${blocked && 'cursor-progress'} 
		overflow-hidden absolute inset-0 bg-accent/25 z-[55]`)

	let slotContainerClass = $derived(
		`min-h-[50%] max-h-[90%] overflow-y-auto w-full bg-base-100 shadow relative`
	)
</script>

<template>
	{#key isShown}
		<div
			id="user-picker"
			class={divClass}
			use:teleport={target}
			use:clickMe
			onclick-me={hide}
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100, delay: 50 }}
			data-blocked={blocked}
		>
			<div
				class="w-full lg:w-2/3 xl:w-3/5 2xl:w-1/3 overflow-auto"
				transition:fly={{ duration: 150, y: -20 }}
			>
				<div
					class="h-full flex flex-col justify justify-center"
					use:clickMe
					onclick-me={hide}
				>
					<JoyContainer
						class={slotContainerClass}
						col
						rounded={BorderRounded.LG}
						padding={ContainerPadding.MD}
					>
						{@render children?.()}
					</JoyContainer>
				</div>
			</div>
		</div>
	{/key}
</template>
