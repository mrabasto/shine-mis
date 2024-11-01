<script lang="ts">
	import { run, createBubbler } from 'svelte/legacy'

	const bubble = createBubbler()
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { fly } from 'svelte/transition'
	import { teleport } from './actions'
	import { sleep, uid } from 'radash'
	import { ToastVariant, type ToastOptions } from './types'
	import type { IconName } from '$lib/components/Base/Icon/types'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import { clickMe } from '$lib/composables/useActions'

	let isShown = $state(false),
		message: string | undefined = $state(),
		sleeping = $state(false),
		noTimer = false

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

	interface Props {
		sleepInSeconds?: number
		variant?: ToastVariant
		id?: string
		target: string
	}

	let {
		sleepInSeconds = 3,
		variant = $bindable(ToastVariant.ERROR),
		id = 'toast',
		target,
	}: Props = $props()

	let divClass = $derived(`${isShown ? 'block' : 'hidden'} toast toast-top
        toast-center no-animation z-50 cursor-pointer`)

	const toast = 'alert rounded-lg bg-white shadow border-2'
	let iconClass = $state('')
	let icon: UnplugIconName = $state()

	run(() => {
		switch (variant) {
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
	})

	let toastClass = $derived(`${toast} ${variant}`)
	let toastId = $derived(`${id}-toast-${uid(10)}`)

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
			onclick-me={() => {
				sleeping = false
				hide()
			}}
		>
			<JoyIcon {icon} class={iconClass} />
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<span onclick={bubble('click')}>{message}</span>
		</div>
	</div>
{/key}
