<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { fade } from 'svelte/transition'
	import { teleport } from './actions'
	import { sleep } from 'radash'
	import { ToastVariant } from './types'
	import type { IconName } from '$lib/components/Base/Icon/types'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'

	let isShown = false,
		message: string | undefined,
		sleeping = false,
		noTimer = false

	export let sleepInSeconds: number = 3
	export let variant: ToastVariant = ToastVariant.ERROR

	export const toggleShown = (newMessage?: string) => {
		if (sleeping) return

		message = newMessage
		isShown ? hide() : show()

		if (noTimer) return
		sleeping = true

		sleep(sleepInSeconds * 1000).then(() => {
			sleeping = false
			hide()
		})
	}

	export const show = () => (isShown = true)
	export const hide = () => (isShown = false)
	export const setVariant = (newVariant: ToastVariant) => (variant = newVariant)
	export const setNoTimer = (timer = false) => (noTimer = timer)

	export let target: string

	$: divClass = `${isShown ? 'block' : 'hidden'} toast toast-top 
        toast-center no-animation`

	const toast = 'alert rounded-lg bg-white shadow border-2'
	let iconClass = ''
	let icon: IconName | UnplugIconName

	$: switch (variant) {
		case ToastVariant.ERROR:
			iconClass = 'text-error'
			icon = 'xmark-circle'
			break
		case ToastVariant.INFO:
			iconClass = 'text-info'
			icon = 'info-circle'
			break
		case ToastVariant.SUCCESS:
			iconClass = 'text-success'
			icon = 'check-circle'
			break
		case ToastVariant.WARNING:
			iconClass = 'text-warning'
			icon = 'warning-circle'
			break
	}

	$: toastClass = `${toast} ${variant}`
</script>

{#key isShown}
	<div
		use:teleport={target}
		in:fade={{ duration: 50 }}
		out:fade={{ duration: 50 }}
		class={divClass}
	>
		<div role="alert" class={toastClass}>
			<JoyIcon {icon} class={iconClass} />
			<span>{message}</span>
		</div>
	</div>
{/key}
