<script lang="ts">
	import { clickMe } from '$lib/composables/useActions'
	import { teleport } from '$lib/components/Advanced/Toast'
	import { fade, fly } from 'svelte/transition'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { BorderRounded, ContainerPadding } from '$lib/types'

	export let isShown = false
	export let blocked = false
	export let target = 'shell'

	export let hide: () => void = () => {
		isShown = false
	}

	$: divClass = `${isShown ? 'flex justify-center' : 'hidden'} ${blocked && 'cursor-progress'} 
		overflow-hidden absolute inset-0 bg-accent/25 z-[55]`

	$: slotContainerClass = `min-h-[50%] max-h-[90%] overflow-y-auto w-full bg-base-100 shadow relative`
</script>

<template>
	{#key isShown}
		<div
			id="user-picker"
			class={divClass}
			use:teleport={target}
			use:clickMe
			on:click-me={hide}
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
					on:click-me={hide}
				>
					<JoyContainer
						class={slotContainerClass}
						col
						rounded={BorderRounded.LG}
						padding={ContainerPadding.MD}
					>
						<slot />
					</JoyContainer>
				</div>
			</div>
		</div>
	{/key}
</template>
