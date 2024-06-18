<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextSize, FontWeight, TextTag } from '$lib/components/Base/Text/types'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import type { ThreadModel } from '$lib/modules/thread/types'
	import { ContainerGap } from '$lib/types/Gap'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button/types'
	import { Size, Stroke } from '$lib/components/Base/Icon/types'
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import { Thread } from '$lib/types/Route'
	import JoyAvatar from '../Avatar/JoyAvatar.svelte'
	import useService from '$lib/composables/useService'
	import type { UseAuth } from '$lib/modules/auth/composables/useAuth'
	import { ServiceKey } from '$lib/services/service'
	import { createEventDispatcher } from 'svelte'
	import { ThreadEvent, type ThreadEvents } from './types'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import { writable } from 'svelte/store'
	import { Upvoteable } from '$lib/modules/upvote/types'
	import useUpvoteRepo from '$lib/modules/upvote/composables/useUpvoteRepo'
	import useSwal from '$lib/composables/useSwal'
	import { debounce } from 'remeda'
	import usePermission from '$lib/composables/usePermission'

	let clazz = ''
	export { clazz as class }
	export let thread: ThreadModel
	const currentThread = writable(thread)
	const upvoteRepo = useUpvoteRepo(Upvoteable.THREAD).updateVoteApi
	const { errorToast } = useSwal()

	// @TODO: Implement dynamic dates
	// import { DateTime, Interval } from 'luxon'
	// const date = DateTime.fromISO(thread.created_at)
	// const now = DateTime.now()
	// const interval = Interval.fromDateTimes(date, now)

	$: threadClass = `relative bg-base-100 shadow-lg h-[300px] shrink-0 justify-between 
		cursor-pointer hover:shadow ${clazz}`

	let isLoading = false,
		userIsAdmin = false

	const dispatch = createEventDispatcher<ThreadEvents>()
	const { get } = useService()
	const { user, token } = get<UseAuth>(ServiceKey.USER)
	const { isAdmin } = usePermission()

	$: if ($user) {
		userIsAdmin = isAdmin($user)
	}

	$: isOwnedByUser = thread.user?.id === $user?.id
	$: showLink = `${Thread.SHOW}/${thread.id}`
	$: upvotesLabel = String($currentThread.upvotes_count || 0)
	$: upvotesLabelClass = `font-bold ${$currentThread.is_upvoted_by_user && 'bg-blue-50 text-info'}`
	$: upvotedStrokeClass = $currentThread.is_upvoted_by_user ? Stroke.INFO : Stroke.NEUTRAL
	$: commentsCountLabel = String($currentThread.comments_count || 0)

	function deleteThread() {
		isLoading = true
		dispatch(ThreadEvent.DELETE, {
			thread,
			toggleLoading: () => (isLoading = !isLoading),
		})
	}

	function editThread() {
		dispatch(ThreadEvent.EDIT, thread)
	}

	function updateThread(thread: ThreadModel) {
		isLoading = true
		dispatch(ThreadEvent.UPDATE, {
			thread,
			toggleLoading: () => (isLoading = !isLoading),
		})
	}

	async function upvoteThreadCallback(threadModel: ThreadModel) {
		if ($token) {
			try {
				const response = await upvoteRepo($token)(threadModel)
				$currentThread = response.data.upvoted as ThreadModel
			} catch (error) {
				$currentThread = threadModel
				errorToast('Error updating this thread')
			}
		}
	}

	const upvoteThread = debounce(() => {
		const original = { ...$currentThread }
		$currentThread.is_upvoted_by_user = !$currentThread.is_upvoted_by_user
		upvoteThreadCallback(original)
	}, {})
</script>

<JoyContainer
	col
	padding={ContainerPadding.SM}
	gap={ContainerGap.NONE}
	class={threadClass}
	rounded={BorderRounded.MD}
>
	<JoyItemLoader {isLoading} class="z-[999]" />
	<JoyRow class="justify-between">
		<JoyAvatar class="mb-2" user={thread.user} />
		<slot name="tr" {thread} />
	</JoyRow>

	<JoyRow class="text-ellipsis w-full justify-between shrink-0">
		<JoyAnchor href={showLink} plain class="grow truncate">
			<JoyText size={TextSize.XL} weight={FontWeight.SEMIBOLD} class="truncate">
				{thread.title}
			</JoyText>
		</JoyAnchor>
	</JoyRow>

	<JoyContainer col padding={ContainerPadding.NONE} class="grow py-2 truncate relative">
		<JoyText tag={TextTag.PARA}>{@html thread.content}</JoyText>
		<div class="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
	</JoyContainer>

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
			on:click={upvoteThread.call}
		>
			<JoyIcon icon="arrowUp" size={Size.SM} bind:stroke={upvotedStrokeClass} />
		</JoyButton>

		<JoyAnchor
			variant={ButtonVariant.GHOST}
			class="font-normal"
			size={ButtonSize.SM}
			href={showLink}
			bind:label={commentsCountLabel}
		>
			<JoyIcon icon="bubble" size={Size.SM} />
		</JoyAnchor>

		<JoyRow gap={ContainerGap.XXS} class="ml-auto">
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

			{#if isOwnedByUser || userIsAdmin}
				<JoyButton
					label="Edit"
					variant={ButtonVariant.GHOST}
					class="font-normal group"
					size={ButtonSize.SM}
					on:click={editThread}
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
					on:click={deleteThread}
				>
					<JoyIcon
						icon="trash"
						size={Size.SM}
						class="group-hover:fill-error group-hover:stroke-error"
					/>
				</JoyButton>
				<slot name="buttons" {updateThread} />
			{/if}
		</JoyRow>
	</JoyContainer>

	<!-- @TODO: Thread tags -->
</JoyContainer>
