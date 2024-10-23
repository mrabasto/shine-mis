<script lang="ts">
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { fly } from 'svelte/transition'
	import { teleport } from './actions'
	import { sleep, uid } from 'radash'
	import { ToastVariant, type ToastOptions } from './types'
	import type { IconName } from '$lib/components/Base/Icon/types'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { clickMe } from '$lib/composables/useActions'

	let isShown = false,
		message: string | undefined,
		sleeping = false,
		noTimer = false

	export let sleepInSeconds: number = 3
	export let variant: ToastVariant = ToastVariant.ERROR
	export let id = 'toast'

	export const fire = (
		toastOptions: ToastOptions = {
			message: '',
			noTimer,
			variant,
		}
	) => {
		setNoTimer(toastOptions.noTimer)
		setVariant(toastOptions.variant!)
		toggleShown(toastOptions.message)
	}

	export const toggleShown = (newMessage?: string) => {
		if (sleeping) return

		message = newMessage
		isShown ? hide() : show()

		if (noTimer) return
		sleeping = true

		sleep(sleepInSeconds * 1000).then(() => {
			if (!sleeping) return
			sleeping = false
			hide()
		})
	}

	export const getToastId = () => toastId
	export const show = () => (isShown = true)
	export const hide = () => (isShown = false)
	export const setNoTimer = (timer = false) => (noTimer = timer)
	export const setVariant = (newVariant: ToastVariant) => (variant = newVariant)

	export let target: string

	$: divClass = `${isShown ? 'block' : 'hidden'} toast toast-top
        toast-center no-animation z-50 cursor-pointer`

	const toast = 'alert rounded-lg bg-white shadow border-2'
	let iconClass = ''
	let icon: UnplugIconName

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
	$: toastId = `${id}-toast-${uid(10)}`

	// onMount(() => console.log('JoyToast mounted', toastId))
	// onDestroy(() => console.log('JoyToast destroyed', toastId))
</script>

{#key isShown}
	<div
		id={toastId}
		use:teleport={target}
		in:fly={{ duration: 100, y: -50 }}
		out:fly={{ duration: 100, y: -50 }}
		class={divClass}
	>
		<div
			role="alert"
			class={toastClass}
			use:clickMe
			on:click-me={() => {
				sleeping = false
				hide()
			}}
		>
			<JoyIcon {icon} class={iconClass} />
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span on:click>{message}</span>
		</div>
	</div>
{/key}
