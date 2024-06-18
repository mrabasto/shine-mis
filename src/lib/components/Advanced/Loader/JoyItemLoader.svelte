<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
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
	<JoyContainer rounded={BorderRounded.MD} class={loaderClass}>
		<JoyRow gap={ContainerGap.XXS}>
			<JoyIcon icon="loading" />
			<JoyText>{label}</JoyText>
		</JoyRow>
	</JoyContainer>
{:else}
	<slot />
{/if}
