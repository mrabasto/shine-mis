<script lang="ts">
	import JoyColumn from '$lib/components/Base/Column/JoyColumn.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { ContainerGap } from '$lib/types/Gap'
	import Quill from 'quill'
	import 'quill/dist/quill.core.css'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'
	import { QuillKeyboard, type QuillKeyboardEvents } from './types'
	let container: HTMLElement = $state(),
		toolbar: HTMLElement = $state()
	let instance: Quill
	interface Props {
		value?: string
		placeholder?: string
		quillClass?: string
		class?: string
	}

	let {
		value = $bindable(''),
		placeholder = 'Write Something',
		quillClass = '',
		class: clazz = '',
	}: Props = $props()

	let _quillClass = $derived(`overflow-auto w-full ${quillClass}`)
	let _columnClass = $derived(`w-full ${clazz}`)

	export const getInstance = (): Quill => instance

	const dispatch = createEventDispatcher<QuillKeyboardEvents>()

	export const setContent = (content: string) =>
		instance.clipboard.dangerouslyPasteHTML(content)

	onMount(() => {
		instance = new Quill(container, {
			placeholder,
			modules: {
				toolbar,
			},
		})

		setContent(value)

		instance.keyboard.addBinding({ key: 'Enter', ctrlKey: true, shiftKey: true }, () => {
			dispatch(QuillKeyboard.CTRL_SHIFT_ENTER, instance)
		})

		instance.on('text-change', () => {
			value = instance.getSemanticHTML()
		})
	})

	onDestroy(() => instance.off('text-change'))
</script>

<JoyColumn class={_columnClass} gap={ContainerGap.XXS}>
	<div bind:this={toolbar} class="border-b pb-1">
		<button class="editor-toolbar-button ql-bold">
			<JoyIcon icon="bold" />
		</button>
		<button class="editor-toolbar-button ql-italic">
			<JoyIcon icon="italic" />
		</button>
		<button class="editor-toolbar-button ql-underline">
			<JoyIcon icon="underline" />
		</button>
	</div>

	<div class={_quillClass}>
		<div class="w-full max-w-full" bind:this={container}></div>
	</div>
</JoyColumn>
