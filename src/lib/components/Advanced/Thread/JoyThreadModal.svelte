<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { Fill, Size, Stroke } from '$lib/components/Base/Icon/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextSize, FontWeight, TextTag, TextColor } from '$lib/components/Base/Text/types'
	import JoyModal from '$lib/components/Advanced/Modal/JoyModal.svelte'
	import useService from '$lib/composables/useService'
	import { ServiceKey } from '$lib/services/service'
	import type { ThreadTags, UseThread } from '$lib/modules/thread/composables/useThread'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import JoyQuill from '$lib/components/Advanced/Quill/JoyQuill.svelte'
	import { createEventDispatcher, onMount } from 'svelte'
	import { ThreadEvent, ThreadModalMode, type ThreadModalEvents } from './types'
	import { superForm, type SuperValidated } from 'sveltekit-superforms'
	import { printValue, type ObjectSchema } from 'yup'
	import type { SelectedThread } from '$lib/modules/thread/types'
	import { yup } from 'sveltekit-superforms/adapters'
	import { ContainerGap } from '$lib/types/Gap'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyBadgeButton from '../Button/JoyBadgeButton.svelte'
	import { BadgeButtonVariant } from '../Button/types'
	import { Border } from '$lib/types/Border'
	let modal: JoyModal
	let quill: JoyQuill

	const { get } = useService()
	const { selectedThread, updateThread, threadTags } = get<UseThread>(ServiceKey.THREADS)

	export let validatedForm: SuperValidated<{ title: string; content: string }>
	export let schema: ObjectSchema<SelectedThread>
	export let mode: ThreadModalMode = ThreadModalMode.CREATE

	const { form, errors, enhance } = superForm(validatedForm, {
		SPA: true,
		resetForm: false,
		validators: yup(schema),
		async onUpdate({ form }) {
			if (form.valid) {
				submit()
			}
		},
	})

	$: modalLabel = mode === ThreadModalMode.CREATE ? 'Create New Thread' : 'Edit Thread'
	$: submitLabel = mode === ThreadModalMode.CREATE ? 'Create Thread' : 'Save Changes'
	$: loadingLabel = mode === ThreadModalMode.CREATE ? 'Posting Thread' : 'Updating Thread'

	// $: switch (mode) {
	// 	case ThreadModalMode.CREATE:
	// 		console.log(ThreadModalMode.CREATE)
	// 		$form.title = $selectedThread.title
	// 		$form.content = $selectedThread.content
	// 		updateQuill($selectedThread.content)
	// 		break
	// 	case ThreadModalMode.EDIT:
	// 		$form.title = $updateThread.title
	// 		$form.content = $updateThread.content
	// 		updateQuill($updateThread.content)
	// 		break
	// }

	const dispatch = createEventDispatcher<ThreadModalEvents>()
	let isLoading = false

	function updateQuill(value: string) {
		if (quill) {
			const instance = quill.getInstance()
			instance.clipboard.dangerouslyPasteHTML(value)
		}
	}

	// @TODO: Make tags dynamic coming from backend
	function tagSelected(tag: ThreadTags) {
		return tag.isSelected ? BadgeButtonVariant.PRIMARY : BadgeButtonVariant.GHOST
	}

	function toggleTag(tag: ThreadTags) {
		tag.isSelected = !tag.isSelected
		$threadTags = [...$threadTags]
	}

	export function openModal() {
		triggerUpdate()
		modal.openModal()
	}

	export function closeModal() {
		modal.closeModal()
	}

	export function toggleLoading() {
		return new Promise((resolve) => resolve((isLoading = !isLoading)))
	}

	export async function reset() {
		await toggleLoading()
		closeModal()
		form.update((value) => ({ ...value, title: '', content: '' }))
	}

	export async function submit() {
		isLoading = true

		if (mode === ThreadModalMode.CREATE) {
			return dispatch(ThreadEvent.CREATE, { title: $form.title, content: $form.content })
		}

		return dispatch(ThreadEvent.EDIT, {
			title: $form.title,
			content: $form.content,
			id: $updateThread.id,
		})
	}

	export function triggerUpdate() {
		switch (mode) {
			case ThreadModalMode.CREATE:
				$form.title = $selectedThread.title
				$form.content = $selectedThread.content
				updateQuill($selectedThread.content)
				break
			case ThreadModalMode.EDIT:
				$form.title = $updateThread.title
				$form.content = $updateThread.content
				updateQuill($updateThread.content)
				break
		}
	}
</script>

<JoyModal bind:this={modal} class="w-1/2 max-w-full" bind:actionBlocked={isLoading}>
	<form method="post" use:enhance slot="modal-body">
		<JoyContainer col padding={ContainerPadding.NONE}>
			<JoyContainer class="justify-between items-center" padding={ContainerPadding.NONE}>
				<JoyText size={TextSize.LG} weight={FontWeight.SEMIBOLD}>
					{modalLabel}
				</JoyText>
				<JoyButton
					label=""
					class="rounded-full btn-circle"
					variant={ButtonVariant.GHOST}
					disabled={isLoading}
					on:click={modal.closeModal}
				>
					<JoyIcon icon="xmark" fill={Fill.NEUTRAL} />
				</JoyButton>
			</JoyContainer>

			<JoyContainer
				class="bg-base-100 shadow-lg border-2"
				border={Border.XS}
				col
				gap={ContainerGap.XXS}
				rounded={BorderRounded.MD}
				padding={ContainerPadding.XXS}
			>
				<JoyInput
					class="w-full focus:outline-none focus:border-transparent"
					bind:value={$form.title}
					placeholder="Title"
					rounded={BorderRounded.MD}
				/>

				{#if $errors.title}
					<span class="first-letter:capitalize text-error">{$errors.title}</span>
				{/if}
			</JoyContainer>

			<JoyContainer
				class="bg-base-100 shadow-lg"
				border={Border.XS}
				col
				rounded={BorderRounded.MD}
				gap={ContainerGap.XXS}
				padding={ContainerPadding.XXS}
			>
				<JoyQuill
					quillClass="max-h-[200px] h-[200px]"
					bind:this={quill}
					bind:value={$form.content}
				/>

				{#if $errors.content}
					<span class="first-letter:capitalize text-error">{$errors.content}</span>
				{/if}
			</JoyContainer>

			<!-- @TODO: Thread tags -->
			<JoyContainer
				class="bg-base-100 shadow-lg"
				col
				rounded={BorderRounded.MD}
				gap={ContainerGap.XXS}
				padding={ContainerPadding.XXS}
			>
				<JoyRow>
					{#each $threadTags as tag}
						<JoyBadgeButton variant={tagSelected(tag)} on:click={() => toggleTag(tag)}>
							{tag.label}
						</JoyBadgeButton>
					{/each}
				</JoyRow>
			</JoyContainer>

			{#if !isLoading}
				<JoyButton
					bind:label={submitLabel}
					variant={ButtonVariant.SECONDARY}
					type="submit"
					disabled={isLoading}
				>
					{#if mode === ThreadModalMode.CREATE}
						<JoyIcon icon="plus" />
					{:else}
						<JoyIcon icon="check" />
					{/if}
				</JoyButton>
			{:else}
				<JoyButton variant={ButtonVariant.GHOST}>
					<JoyIcon icon="loading" size={Size.XL} stroke={Stroke.SECONDARY_CONTENT} />
					<JoyText tag={TextTag.SPAN} color={TextColor.SECONDARY}>
						{loadingLabel} ...
					</JoyText>
				</JoyButton>
			{/if}
		</JoyContainer>
	</form>
</JoyModal>
