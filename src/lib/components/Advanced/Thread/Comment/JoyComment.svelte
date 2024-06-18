<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonVariant, ButtonSize } from '$lib/components/Base/Button/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Fill, Size, Stroke } from '$lib/components/Base/Icon/types'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextTag, TextSize, TextColor } from '$lib/components/Base/Text/types'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import JoyAvatar from '$lib/components/Advanced/Avatar/JoyAvatar.svelte'
	import type { CommentModel } from '$lib/modules/comment/types'
	import useService from '$lib/composables/useService'
	import type { UseAuth } from '$lib/modules/auth/composables/useAuth'
	import { ServiceKey } from '$lib/services/service'
	import JoyCommentBox from './JoyCommentBox.svelte'
	import { createEventDispatcher, onDestroy, tick } from 'svelte'
	import {
		CommentBoxMode,
		CommentEvent,
		type CommentCreateDispatch,
		type CommentDeleteDispatch,
		type CommentEvents,
		type CommentUpdateDispatch,
		type CommentUpvoteDispatch,
	} from '../types'
	import type { UseComment } from '$lib/modules/comment/composables/useComment'
	import { onMount } from 'svelte'
	import { writable, type Unsubscriber } from 'svelte/store'
	import type { UseCommentRepo } from '$lib/modules/comment/composables/useCommentRepo'
	import useCommentRepo from '$lib/modules/comment/composables/useCommentRepo'
	import useSwal from '$lib/composables/useSwal'
	import { debounce } from 'remeda'
	import type { UseUpvote } from '$lib/modules/upvote/composables/useUpvote'
	import type { UpvoteResponse, UpvotedDto } from '$lib/modules/upvote/composables/useUpvoteRepo'
	import { Upvoteable } from '$lib/modules/upvote/types'

	export let comment: CommentModel
	let storeComment = writable<CommentModel>(comment)
	export let form,
		errors,
		submit: () => void,
		isReply = false

	const { get } = useService()
	const { user, token } = get<UseAuth>(ServiceKey.USER)
	const { upvotedModel } = get<UseUpvote>(ServiceKey.UPVOTES)
	const { selectedComment, inReplyComment, deletedComment, updatedComment } = get<UseComment>(
		ServiceKey.COMMENTS
	)

	const { errorToast } = useSwal()

	let commentRepo: UseCommentRepo

	if ($storeComment.thread) {
		commentRepo = useCommentRepo($storeComment.thread)
	}

	if ($storeComment.thread_id) {
		commentRepo = useCommentRepo($storeComment.thread_id)
	}

	const dispatch = createEventDispatcher<CommentEvents>()

	let isWritingComment = false,
		openReply = writable(false),
		isLoading = false,
		replyButtonLabel = '',
		mode = CommentBoxMode.CREATE,
		commentBox: JoyCommentBox

	$: isOwnedByUser = $storeComment.user_id === $user?.id
	$: commentClass = `min-h-[250px] bg-base-100 shadow-lg flex-shrink-0 
	${isReply ? 'border-l' : 'border'}`
	$: replyButtonLabel = String($storeComment.replies?.length || 0)
	$: upvotesLabel = String($storeComment.upvotes_count || 0)
	$: upvotesLabelClass = `font-bold ${$storeComment.is_upvoted_by_user && 'bg-blue-50 text-info'}`
	$: upvotedStrokeClass = $storeComment.is_upvoted_by_user ? Stroke.INFO : Stroke.NEUTRAL

	function submitReply(event: CustomEvent<CommentCreateDispatch | CommentUpdateDispatch>) {
		$form.is_reply = true
		$form.submit_mode = event.detail.submit_mode
		isWritingComment = false
		$selectedComment = { ...$storeComment, ...event.detail }
		submit()
	}

	function editComment() {
		isWritingComment = true
		mode = CommentBoxMode.EDIT
		tick().then(() => commentBox?.setContent($storeComment.content))
	}

	function deleteComment(comment: CommentModel) {
		isLoading = true
		dispatch(CommentEvent.DELETE, {
			comment,
			toggleLoading: () => (isLoading = true),
		})
	}

	function removeReplyCallback(event: CustomEvent<CommentDeleteDispatch>) {
		const { comment } = event.detail

		deleteComment(comment)
	}

	function removeReply(reply: CommentModel) {
		if ($storeComment.replies) {
			$storeComment.replies = [...$storeComment.replies.filter((r) => r.id !== reply.id)]
			$storeComment = $storeComment
		}
	}

	function replyComment() {
		isWritingComment = true
		mode = CommentBoxMode.CREATE
		$form.in_reply_to = $storeComment.id
	}

	const upvoteComment = debounce((comment: CommentModel) => {
		const original = { ...comment }

		comment.is_upvoted_by_user = !comment.is_upvoted_by_user

		dispatch(CommentEvent.UPVOTE, {
			comment: original,
			toggleLoading: () => (isLoading = !isLoading),
		})
	}, {})

	const upvoteReplyCallback = (event: CustomEvent<CommentUpvoteDispatch>) => {
		const { comment } = event.detail

		upvoteComment.call(comment)
	}

	const fetchReplies = debounce(
		async () => {
			if ($token && ($storeComment.replies === undefined || $storeComment.replies.length === 0)) {
				try {
					const response = await commentRepo.getReplies($token)($storeComment)
					let replies = response.data.data
					$storeComment.replies = replies
					return replies
				} catch {
					return errorToast('Error fetching replies')
				}
			}
		},
		{ waitMs: 2000 }
	)

	let inReplyUnsubscriber: Unsubscriber,
		openReplyUnsubscriber: Unsubscriber,
		deletedCommentUnsubscriber: Unsubscriber,
		updatedCommentUnsubscriber: Unsubscriber,
		upvotedCommentUnsubscriber: Unsubscriber

	onMount(() => {
		inReplyUnsubscriber = inReplyComment.subscribe(async (replyComment?: CommentModel) => {
			if (replyComment && replyComment.replied_id === $storeComment.id) {
				inReplyComment.set(undefined)

				if ($storeComment.replies) {
					$storeComment.replies = [...$storeComment?.replies, replyComment]
				} else {
					$storeComment.replies = [replyComment]
				}

				if (!$openReply) {
					tick().then(() => openReply.update(() => true))
				}
			}
		})

		deletedCommentUnsubscriber = deletedComment.subscribe(async (replyComment?: CommentModel) => {
			if (replyComment && replyComment.replied_id === $storeComment.id) {
				deletedComment.set(undefined)
				removeReply(replyComment)
			}
		})

		openReplyUnsubscriber = openReply.subscribe((reply) => {
			if (reply) {
				fetchReplies.call()
			}
		})

		updatedCommentUnsubscriber = updatedComment.subscribe(async (comment?: CommentModel) => {
			if (comment && comment.id === $storeComment.id) {
				updatedComment.set(undefined)
				storeComment.update((current: CommentModel) => ({ ...current, ...comment }))
			}
		})

		upvotedCommentUnsubscriber = upvotedModel.subscribe(async (upvotedDto?: UpvotedDto) => {
			if (upvotedDto?.model === Upvoteable.COMMENT && upvotedDto.upvoted.id === $storeComment.id) {
				upvotedModel.set(undefined)
				const { upvoted } = upvotedDto
				if (upvoted) {
					storeComment.update((comment) => ({
						...comment,
						...(upvoted as CommentModel),
					}))
				}
			}
		})
	})

	onDestroy(() => {
		inReplyUnsubscriber()
		openReplyUnsubscriber()
		deletedCommentUnsubscriber()
		upvotedCommentUnsubscriber()
	})
</script>

<JoyContainer
	col
	padding={ContainerPadding.SM}
	gap={ContainerGap.XXS}
	class={commentClass}
	rounded={isReply ? BorderRounded.NONE : BorderRounded.MD}
>
	<!-- @TODO: Separate Widget for user display -->
	<JoyRow class="items-center shrink-0" gap={ContainerGap.XXS}>
		<JoyAvatar user={$storeComment.user} />
		<JoyText tag={TextTag.SPAN} size={TextSize.XS} class="grow py-2">- 2d ago</JoyText>
	</JoyRow>

	<div class="my-6 shrink-0">
		<JoyText tag={TextTag.PARA} class="grow py-2">
			{@html $storeComment.content}
		</JoyText>
	</div>

	<JoyContainer
		class="shadow-lg shrink-0 mt-auto border-t pt-2"
		padding={ContainerPadding.NONE}
		gap={ContainerGap.XXS}
	>
		<JoyButton
			bind:label={upvotesLabel}
			variant={ButtonVariant.GHOST}
			bind:class={upvotesLabelClass}
			size={ButtonSize.SM}
			on:click={() => upvoteComment.call($storeComment)}
		>
			<JoyIcon icon="arrowUp" size={Size.SM} bind:stroke={upvotedStrokeClass} />
		</JoyButton>

		<JoyButton
			label="Reply"
			variant={ButtonVariant.GHOST}
			class="font-normal"
			on:click={replyComment}
			size={ButtonSize.SM}
		>
			<JoyIcon icon="bubble" size={Size.SM} />
		</JoyButton>

		<JoyButton
			label={replyButtonLabel}
			variant={ButtonVariant.GHOST}
			class="font-bold"
			on:click={() => openReply.update((isOpen) => !isOpen)}
			size={ButtonSize.SM}
		>
			<JoyIcon icon="bubble" fill={Fill.NEUTRAL} size={Size.SM} />
		</JoyButton>

		{#if !isOwnedByUser}
			<JoyButton
				label="Save"
				variant={ButtonVariant.GHOST}
				class="font-normal ml-auto group"
				size={ButtonSize.SM}
			>
				<JoyIcon icon="save" size={Size.SM} class="group-hover:fill-accent" />
			</JoyButton>
		{/if}

		{#if isOwnedByUser}
			<JoyRow gap={ContainerGap.XXS} class="ml-auto">
				<JoyButton
					label="Edit"
					variant={ButtonVariant.GHOST}
					class="font-normal group"
					size={ButtonSize.SM}
					on:click={editComment}
				>
					<JoyIcon
						icon="pencil"
						size={Size.SM}
						class="group-hover:fill-info group-hover:stroke-info"
					/>
				</JoyButton>
				<JoyButton
					label="Delete"
					variant={ButtonVariant.GHOST}
					class="font-normal group"
					size={ButtonSize.SM}
					on:click={() => deleteComment($storeComment)}
				>
					<JoyIcon
						icon="trash"
						size={Size.SM}
						class="group-hover:fill-error group-hover:stroke-error"
					/>
				</JoyButton>
			</JoyRow>
		{/if}
	</JoyContainer>

	{#if isWritingComment}
		<JoyCommentBox
			bind:this={commentBox}
			class="shrink-0"
			{form}
			{errors}
			bind:isWritingComment
			bind:mode
			on:comment-create={submitReply}
			on:comment-edit={submitReply}
		/>
	{/if}

	{#if $openReply}
		{#if $storeComment.replies && $storeComment.replies.length > 0}
			{#each $storeComment.replies as reply (reply.id)}
				<div class="my-2">
					<svelte:self
						comment={reply}
						{form}
						{errors}
						{submit}
						isReply={true}
						on:comment-delete={removeReplyCallback}
						on:comment-upvote={upvoteReplyCallback}
					/>
				</div>
			{/each}
		{:else}
			<JoyText tag={TextTag.SPAN} class="p-2" color={TextColor.NEUTRAL_CONTENT}
				>No replies yet</JoyText
			>
		{/if}
	{/if}
</JoyContainer>
