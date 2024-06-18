<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { fade } from 'svelte/transition'
	import { teleport } from './actions'
	import { sleep } from 'radash'

	let isShown = false,
		message: string,
		sleeping = false

	export let sleepInSeconds: number = 3

	export const toggleShown = (newMessage: string) => {
		if (sleeping) return

		message = newMessage
		isShown = true
		sleeping = true

		sleep(sleepInSeconds * 1000).then(() => {
			sleeping = false
			isShown = false
		})
	}

	export let target: string

	$: divClass = `${isShown ? 'block' : 'hidden'} toast toast-top 
        toast-center no-animation`
</script>

{#key isShown}
	<div
		use:teleport={target}
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
		class={divClass}
		on:teleport={() => console.log('teleported to', target)}
	>
		<div role="alert" class="alert rounded-lg bg-base-100 border-2">
			<JoyIcon icon="xmark-circled" class="text-error-content" />
			<span>{message}</span>
		</div>
	</div>
{/key}
