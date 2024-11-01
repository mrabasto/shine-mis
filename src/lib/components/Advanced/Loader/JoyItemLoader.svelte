<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size, Stroke } from '$lib/components/Base/Icon/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextSize } from '$lib/components/Base/Text/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { ContainerGap } from '$lib/types/Gap'
	import { fade } from 'svelte/transition'

	interface Props {
		class?: string
		label?: string
		isLoading?: boolean
		children?: import('svelte').Snippet
	}

	let {
		class: clazz = '',
		label = 'Please wait',
		isLoading = $bindable(false),
		children,
	}: Props = $props()
	let loaderClass = $derived(`absolute inset-0 bg-white/25 backdrop-blur-sm 
		grid place-items-center z-10 ${clazz}`)
</script>

{#if isLoading}
	<div class={loaderClass} transition:fade>
		<JoyContainer gap={ContainerGap.SM} alignItems={AlignItems.CENTER}>
			<JoyIcon
				icon="loading"
				size={Size.XL_2}
				stroke={Stroke.PRIMARY}
				class="text-primary"
			/>
			<JoyText size={TextSize.XL_2}>{label}</JoyText>
		</JoyContainer>
	</div>
{:else}
	{@render children?.()}
{/if}
