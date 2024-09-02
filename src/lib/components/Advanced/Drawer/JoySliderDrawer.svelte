<script lang="ts">
	import JoyDrawer from '$lib/components/Advanced/Drawer/JoyDrawer.svelte'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'
	import { escapePress } from '$lib/composables/useActions'
	import { writable } from 'svelte/store'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { ContainerPadding } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'

	let toast: JoyToast

	export let id = 'drawer'
	export let isLoading = false
	export let isShown = writable(false)
	export let moduleLabel = 'module'
	export let modeLabel = 'mode'
	export let target = 'shell'

	const hide = () => {
		history.back()
	}
</script>

<JoyToast bind:this={toast} {target} {id} />

<JoyDrawer blocked={isLoading} isShown={$isShown} {hide}>
	<section use:escapePress on:escape={hide} data-blocked={!$isShown} />
	<JoyItemLoader {isLoading} />

	<JoyContainer
		class="w-full"
		alignItems={AlignItems.CENTER}
		padding={ContainerPadding.MD}
	>
		<JoyButton
			class="rounded-full btn-circle"
			variant={ButtonVariant.GHOST}
			on:click={hide}
		>
			<JoyIcon icon="xmark" />
		</JoyButton>
		<JoyContainer>
			<JoyText weight={FontWeight.LIGHT} size={TextSize.LG}>{moduleLabel}</JoyText>
			<JoyText weight={FontWeight.NORMAL} size={TextSize.LG}>/</JoyText>
			<JoyText weight={FontWeight.BOLD} size={TextSize.LG}>
				{modeLabel}
			</JoyText>
		</JoyContainer>

		<JoyTooltip class="ml-auto" placement="left">
			<JoyIcon icon="question-mark-circle" />

			<JoyContainer
				slot="tooltip-content"
				class="w-full"
				padding={ContainerPadding.XXS}
				col
			>
				<span>(Esc) Close</span>
				<slot name="tooltip" />
			</JoyContainer>
		</JoyTooltip>
	</JoyContainer>
	<slot {hide}/>
</JoyDrawer>
