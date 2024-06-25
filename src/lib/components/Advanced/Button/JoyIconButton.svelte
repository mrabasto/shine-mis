<script lang="ts">
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { Size, type IconName } from '$lib/components/Base/Icon/types'
	export let icon: IconName | UnplugIconName = 'crown-circle'
	export let label: string | undefined = undefined
	export let size: ButtonSize = ButtonSize.SM
	export let variant: ButtonVariant = ButtonVariant.NEUTRAL
	export let plain: boolean = false
	export let outline: boolean = false
	export let type: 'submit' | 'reset' | 'button' = 'button'
	export let disabled: boolean = false
	export let noAnimation: boolean = true
	let clazz = ''
	export { clazz as class }
	export let iconSize: Size = Size.SM

	let btnClass = clazz

	$: if (!plain) {
		btnClass = `btn ${outline && 'btn-outline'} ${variant} ${size} ${clazz} 
			${noAnimation && 'no-animation'} gap-2 items-center`
	}

	function nodeType(node: HTMLButtonElement) {
		node.type = type
	}
</script>

<button class={btnClass} on:click use:nodeType {disabled}>
	<JoyIcon {icon} size={iconSize} />
	<slot />
	{#if label}
		{label}
	{/if}
</button>
