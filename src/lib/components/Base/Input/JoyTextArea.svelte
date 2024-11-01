<script lang="ts">
	import { run } from 'svelte/legacy'

	import { BorderRounded } from '$lib/types/Round'
	import { TextAreaSize, TextAreaVariant } from './types'

	interface Props {
		placeholder?: string
		size?: TextAreaSize
		variant?: TextAreaVariant
		bordered?: boolean
		value?: string | number | undefined
		name?: string | undefined
		rounded?: BorderRounded
		class?: string
	}

	let {
		placeholder = 'Type here',
		size = TextAreaSize.MD,
		variant = TextAreaVariant.NEUTRAL,
		bordered = false,
		value = $bindable(undefined),
		name = undefined,
		rounded = BorderRounded.MD,
		class: clazz = '',
	}: Props = $props()
	let textareaClass = $state('')

	run(() => {
		let buildClass = ''

		if (bordered) {
			buildClass += ' input-bordered'
		}

		textareaClass = `textarea ${variant} ${size} ${rounded} ${buildClass} ${clazz}`
	})
</script>

<textarea {name} {placeholder} class={textareaClass} bind:value></textarea>
