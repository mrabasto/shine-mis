<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { createEventDispatcher } from 'svelte'
	import JoyQuill from '$lib/components/Advanced/Quill/JoyQuill.svelte'
	import {
		CommentBoxMode,
		CommentEvent,
		type CommentBoxEvents,
	} from '$lib/components/Advanced/Thread/types'
	export let form
	export let errors
	export let isWritingComment: boolean
	export let mode: CommentBoxMode = CommentBoxMode.CREATE
	let quill: JoyQuill
	let clazz = ''
	export { clazz as class }

	const dispatch = createEventDispatcher<CommentBoxEvents>()

	export const setContent = (value: string) => quill?.setContent(value)

	function submit(event: Event) {
		event.preventDefault()

		$form.submit_mode = mode

		if (mode === CommentBoxMode.CREATE) {
			return dispatch(CommentEvent.CREATE, { ...$form })
		}

		return dispatch(CommentEvent.EDIT, { ...$form })
	}

	$: commentBoxClass = `bg-base-100 shadow-lg border-2 ${clazz}`
</script>

<JoyContainer
	class={commentBoxClass}
	rounded={BorderRounded.MD}
	col
	padding={ContainerPadding.NONE}
>
	<JoyQuill
		quillClass="max-h-[200px]"
		bind:this={quill}
		placeholder="Write your comment"
		bind:value={$form.content}
		on:ctrl-shift-enter={submit}
	/>

	{#if $errors.content}
		<span class="first-letter:capitalize text-error p-2">{$errors.content}</span>
	{/if}
</JoyContainer>
<JoyRow gap={ContainerGap.XXS} class="justify-end" padding={ContainerPadding.XXS}>
	<JoyButton
		size={ButtonSize.SM}
		variant={ButtonVariant.GHOST}
		on:click={() => (isWritingComment = false)}>Cancel</JoyButton
	>
	<JoyButton size={ButtonSize.SM} variant={ButtonVariant.SECONDARY} type="submit" on:click={submit}>
		Confirm
	</JoyButton>
</JoyRow>
