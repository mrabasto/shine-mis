<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { fade, fly } from 'svelte/transition'
	import { teleport } from '$lib/components/Advanced/Toast/actions'
	import { clickMe } from '$lib/composables/useActions'

	export let isShown = false

	export let target = 'shell'
	export let blocked = false

	export let hide: () => void = () => {
		isShown = false
	}

	let clazz = ''
	export { clazz as class }

	$: divClass = `${isShown ? 'flex justify-end' : 'hidden'} ${blocked && 'cursor-progress'} 
		overflow-hidden absolute inset-0 bg-base-300/50 z-50`

	$: slotContainerClass = `min-h-full w-full bg-base-100 shadow relative ${clazz}`
</script>

{#key isShown}
	<div
		id="drawer"
		class={divClass}
		use:teleport={target}
		use:clickMe
		on:click-me={hide}
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100, delay: 100 }}
		data-blocked={blocked}
	>
		<div
			class="w-full lg:w-2/3 xl:w-3/5 2xl:w-1/3 overflow-auto"
			transition:fly={{ duration: 200, x: 200 }}
		>
			<div class="h-full" transition:fade={{ duration: 200 }}>
				<JoyContainer class={slotContainerClass} col>
					<slot />
				</JoyContainer>
			</div>
		</div>
	</div>
{/key}
