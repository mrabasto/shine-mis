<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Stroke } from '$lib/components/Base/Icon/types'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { ContainerGap } from '$lib/types/Gap'
	import { BorderRounded } from '$lib/types/Round'
	let clazz = ''
	export { clazz as class }
	export let label = 'Please wait'
	$: loaderClass = `absolute inset-0 bg-white bg-opacity-90 
		grid place-items-center ${clazz}`

	export let isLoading = false
</script>

{#if isLoading}
	<div class={loaderClass}>
		<JoyRow gap={ContainerGap.XXS}>
			<JoyIcon icon="loading" stroke={Stroke.NEUTRAL} />
			<JoyText>{label}</JoyText>
		</JoyRow>
	</div>
{:else}
	<slot />
{/if}
