<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { fly } from 'svelte/transition'

	let isShown = true

	let duration = 200,
		delay = 200

	$: display = isShown ? 'absolute flex' : 'hidden'
	$: showDisplay = !isShown ? 'absolute flex' : 'hidden'
	$: trackerClass = `-translate-x-1/2 start-1/2 end-1/2 bottom-1 bg-white/25 
		rounded-lg z-[9999] gap-2 items-center backdrop-blur-sm overflow-hidden`
	$: displayClass = `${display} ${trackerClass} w-[500px] p-4`
	$: showDisplayClass = `${showDisplay} ${trackerClass} w-[100px] justify-center`
</script>

{#key isShown}
	<div
		class={displayClass}
		in:fly={{ duration, delay, y: 100 }}
		out:fly={{ duration, y: 100 }}
	>
		<span>Screen Size:</span>
		<div class="font-bold">
			<span class="block sm:hidden">Mobile</span>
			<span class="hidden sm:block md:hidden">SM</span>
			<span class="hidden md:block lg:hidden">MD</span>
			<span class="hidden lg:block xl:hidden">LG</span>
			<span class="hidden xl:block 2xl:hidden">XL</span>
			<span class="hidden 2xl:block">2XL</span>
		</div>
		<JoyButton plain label="hide" class="ml-auto" on:click={() => (isShown = !isShown)} />
	</div>

	<div
		class={showDisplayClass}
		in:fly={{ duration, delay, y: 100 }}
		out:fly={{ duration, y: 100 }}
	>
		<JoyButton
			plain
			on:click={() => (isShown = !isShown)}
			class="w-full h-full grid place-items-center"
		>
			<JoyIcon icon="nav-arrow-up" />
		</JoyButton>
	</div>
{/key}
