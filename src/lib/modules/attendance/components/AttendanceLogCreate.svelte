<script lang="ts">
	import JoyDrawer from '$lib/components/Advanced/Drawer/JoyDrawer.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { BorderRounded, ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import {
		ApprovalStatus,
		type CashRequest,
		type CashRequestItem,
	} from '$lib/modules/finance/cash-request/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { uid } from 'radash'
	import { cashRequestService } from '$lib/modules/finance/cash-request/services'
	import { type CashRequestDispatch } from '$lib/modules/finance/cash-request/events'
	import { tick } from 'svelte'
	import { scale, slide } from 'svelte/transition'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import { ctrlEnter, ctrlShiftEnter, escapePress } from '$lib/composables/useActions'
	import { page } from '$app/stores'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'
	import { writable } from 'svelte/store'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyContextMenu from '$lib/components/Advanced/ContextMenu/JoyContextMenu.svelte'
	import JoyIconButton from '$lib/components/Advanced/Button/JoyIconButton.svelte'
	import { user, type User } from '$lib/modules/authentication'
	import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
	import JoyUserPicker from '$lib/components/Advanced/UserPicker/JoyUserPicker.svelte'
	import { selectedCashRequest } from '$lib/modules/finance/cash-request/stores'
	import { CashRequestDrawerMode } from '$lib/modules/finance/cash-request/components/types'

	interface Props extends CashRequestDispatch {
		maxLimit?: number
	}

	let {
		maxLimit = 10,
		cashRequestEdit,
		cashRequestCreate,
		cashRequestError,
	}: Props = $props()

	let items: CashRequestItem[] = $state([]),
		isLoading = $state(false),
		toast = $state<ReturnType<typeof JoyToast>>(),
		mode = writable(CashRequestDrawerMode.CREATE),
		isShown = writable(false),
		cashRequest = writable<CashRequest>(),
		requestModeLabel = $state(''),
		submitItemsLabel = $state(''),
		isUserPickerShown = $state(false)

	const { createCashRequest, updateCashRequest } = cashRequestService()

	const newItem = () => ({
		id: uid(10),
		label: '',
		price: 0,
	})

	const addItem = () => {
		if (isInLimit) return
		const nItem = newItem()
		items = [...items, nItem]

		tick().then(() => {
			document.getElementById('input-' + nItem.id)?.focus()
		})
	}

	const removeItem = (item: CashRequestItem) => {
		items = items.filter((i) => i.id !== item.id)
	}

	const submit = () => {
		if (notValid) {
			return toast?.fire({
				message: 'Invalid items',
				variant: ToastVariant.ERROR,
			})
		}

		isLoading = true

		if ($mode === CashRequestDrawerMode.EDIT) {
			let dto: Partial<CashRequest> = {
				...$cashRequest,
				items,
				approved_by: $user.id,
			}

			return updateCashRequest($cashRequest?.id, dto)
				.then((response) => {
					cashRequestEdit?.(response)

					tick().then(() => {
						hide()
					})
				})
				.catch((response) => cashRequestError?.(response.message))
				.finally(() => (isLoading = false))
		}

		createCashRequest(items)
			.then((response) => {
				cashRequestCreate?.(response)

				tick().then(() => {
					hide()
				})
			})
			.catch((response) => cashRequestError?.(response.message))
			.finally(() => (isLoading = false))
	}

	const approvalIcon = (approvalStatus: ApprovalStatus): UnplugIconName => {
		switch (approvalStatus) {
			case ApprovalStatus.PENDING:
				return 'warning-circle-solid'
			case ApprovalStatus.APPROVED:
				return 'check-circle-solid'
			case ApprovalStatus.DECLINED:
				return 'xmark-circle-solid'
		}
	}

	const approvalIconClass = (approvalStatus: ApprovalStatus) => {
		switch (approvalStatus) {
			case ApprovalStatus.PENDING:
				return 'text-warning'
			case ApprovalStatus.APPROVED:
				return 'text-success'
			case ApprovalStatus.DECLINED:
				return 'text-error'
		}
	}

	const approvalButtonClass = (approvalStatus: ApprovalStatus) => {
		const btn = 'capitalize w-full py-2 rounded-lg'
		switch (approvalStatus) {
			case ApprovalStatus.PENDING:
				return `${btn} bg-warning/10 hover:bg-warning/25 text-warning`
			case ApprovalStatus.APPROVED:
				return `${btn} bg-success/10 hover:bg-success/25 text-success`
			case ApprovalStatus.DECLINED:
				return `${btn} bg-error/10 hover:bg-error/25 text-error`
		}
	}

	const changeApprovalStatus = (approvalStatus: ApprovalStatus) => {
		$cashRequest = { ...$cashRequest, approval_status: approvalStatus }
	}

	const updateCashRequestedBy = (event: CustomEvent<User>) => {
		if ($cashRequest.expand?.requested_by) {
			$cashRequest.requested_by = event.detail.id
			$cashRequest.expand.requested_by = event.detail
		}
	}

	export const show = () => ($isShown = true)
	export const hide = () => {
		history.back()
	}

	let notValid = $derived(
		items.length === 0 ||
			items.some((i) => i.label.length === 0 || !i.price || i.price === 0)
	)

	let isInLimit = $derived(items.length === maxLimit)

	page.subscribe((value) => {
		$isShown = Boolean(value.state.cashRequestDrawer?.isOpen)
	})

	isShown.subscribe(async (value) => {
		if (!value) return

		const m = $page.state.cashRequestDrawer?.drawerMode as CashRequestDrawerMode
		switch (m) {
			case CashRequestDrawerMode.CREATE:
				requestModeLabel = 'New Request'
				submitItemsLabel = 'Submit'
				items = []
				break
			case CashRequestDrawerMode.EDIT:
				requestModeLabel = 'Edit Request'
				submitItemsLabel = 'Save'

				$cashRequest = $selectedCashRequest
				items = $cashRequest.items
				break
		}

		$mode = m
	})
</script>

<JoyToast bind:this={toast} target="shell" id="cash-request-drawer" />

<JoyDrawer blocked={isLoading} isShown={$isShown} {hide}>
	<section
		use:ctrlEnter
		use:escapePress
		onescape={hide}
		onctrl-enter={addItem}
		use:ctrlShiftEnter
		onctrl-shift-enter={submit}
		data-blocked={!$isShown}
	></section>

	<JoyItemLoader {isLoading} />

	<JoyContainer
		class="w-full"
		alignItems={AlignItems.CENTER}
		padding={ContainerPadding.MD}
	>
		<JoyButton
			class="rounded-full btn-circle"
			variant={ButtonVariant.GHOST}
			onclick={hide}
		>
			<JoyIcon icon="xmark" />
		</JoyButton>
		<JoyContainer>
			<JoyText weight={FontWeight.LIGHT} size={TextSize.LG}>Cash Requests</JoyText>
			<JoyText weight={FontWeight.NORMAL} size={TextSize.LG}>/</JoyText>
			<JoyText weight={FontWeight.BOLD} size={TextSize.LG}>
				{requestModeLabel}
			</JoyText>
		</JoyContainer>

		<JoyTooltip class="ml-auto" placement="left">
			<JoyIcon icon="question-mark-circle" />

			{#snippet tooltipContent()}
				<JoyContainer class="w-full" padding={ContainerPadding.XS} col>
					<span>(Esc) Close</span>
					<span>(Ctrl+Enter) Add item</span>
					<span>(Ctrl+Shift+Enter) Submit items</span>
				</JoyContainer>
			{/snippet}
		</JoyTooltip>
	</JoyContainer>

	{#if $mode === CashRequestDrawerMode.EDIT}
		<JoyUserPicker
			bind:isShown={isUserPickerShown}
			selectedUser={$cashRequest.expand?.requested_by}
			on:user-picker-selected={updateCashRequestedBy}
		/>
		<JoyContainer
			padding={ContainerPadding.NONE}
			class="w-full px-8 py-0"
			justify={Justify.BETWEEN}
			alignItems={AlignItems.CENTER}
		>
			<JoyText size={TextSize.LG} class="flex items-center gap-2 shrink-0">
				<JoyIcon icon="user-circle" size={Size.LG} />
				Requested By:
			</JoyText>

			<JoyText size={TextSize.LG} class="flex items-center gap-2 shrink-0">
				{$cashRequest.expand?.requested_by.name}
			</JoyText>

			<JoyButton
				label="Pick User"
				variant={ButtonVariant.NEUTRAL}
				onclick={() => (isUserPickerShown = true)}
			/>
		</JoyContainer>

		<JoyContainer
			padding={ContainerPadding.NONE}
			class="w-full px-8 py-0"
			justify={Justify.BETWEEN}
			alignItems={AlignItems.CENTER}
		>
			<JoyText size={TextSize.LG} class="flex items-center gap-2 shrink-0">
				{#key $cashRequest.approval_status}
					<div in:scale>
						<JoyIcon
							icon={approvalIcon($cashRequest.approval_status)}
							class={approvalIconClass($cashRequest.approval_status)}
							size={Size.LG}
						/>
					</div>
				{/key}
				Status:
			</JoyText>

			<JoyContextMenu class="grow" placement="bottom-end" fitSize>
				{#snippet contextTarget(showContextMenu)}
					<JoyButton
						label={$cashRequest.approval_status}
						plain
						class={approvalButtonClass($cashRequest.approval_status)}
						size={ButtonSize.LG}
						onclick={showContextMenu}
					/>
				{/snippet}

				{#snippet contextContents(hideContextMenu)}
					<JoyIconButton
						size={ButtonSize.MD}
						class="w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-success/10 rounded-lg"
						icon="check-circle-solid"
						iconClass="text-success"
						plain
						onclick={() => {
							changeApprovalStatus(ApprovalStatus.APPROVED)
							hideContextMenu()
						}}
					>
						Approve
					</JoyIconButton>

					<JoyIconButton
						size={ButtonSize.MD}
						class="w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-error/10 rounded-lg"
						icon="xmark-circle-solid"
						iconClass="text-error"
						onclick={() => {
							changeApprovalStatus(ApprovalStatus.DECLINED)
							hideContextMenu()
						}}
						plain
					>
						Decline
					</JoyIconButton>

					<JoyIconButton
						size={ButtonSize.MD}
						class="w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-warning/10 rounded-lg"
						icon="warning-circle-solid"
						iconClass="text-warning"
						onclick={() => {
							changeApprovalStatus(ApprovalStatus.PENDING)
							hideContextMenu()
						}}
						plain
					>
						Pending
					</JoyIconButton>
				{/snippet}
			</JoyContextMenu>
		</JoyContainer>

		<hr class="w-full" />
	{/if}

	<JoyContainer
		padding={ContainerPadding.NONE}
		class="w-full px-8 py-0"
		justify={Justify.BETWEEN}
		alignItems={AlignItems.CENTER}
	>
		<JoyText size={TextSize.LG} class="flex items-center gap-2">
			<JoyIcon icon="shopping-bag-plus" size={Size.LG} />
			Items
		</JoyText>
		<JoyButton
			label={submitItemsLabel}
			variant={ButtonVariant.ACCENT}
			disabled={notValid}
			onclick={submit}
		/>
	</JoyContainer>

	<JoyContainer padding={ContainerPadding.XXS} col class="w-full">
		<JoyContainer
			col
			class="w-full bg-base-200"
			padding={ContainerPadding.SM}
			rounded={BorderRounded.LG}
		>
			{#each items as item (item.id)}
				<div class="w-full" transition:slide|local={{ duration: 100 }}>
					<JoyContainer
						class="w-full"
						alignItems={AlignItems.CENTER}
						justify={Justify.BETWEEN}
						gap={ContainerGap.XXS}
					>
						<JoyInput
							bordered
							placeholder="Item"
							bind:value={item.label}
							class="grow"
							id={item.id}
						/>
						<JoyInput
							bordered
							placeholder="Amount"
							type="number"
							bind:value={item.price}
							class="grow"
							id={'amount-' + item.id}
						/>

						<JoyButton
							class="rounded-full shrink-0 group justify-center items-center"
							plain
							variant={ButtonVariant.GHOST_ERROR}
							size={ButtonSize.SM}
							onclick={() => removeItem(item)}
						>
							<JoyIcon icon="trash-solid" class="group-hover:text-error" />
						</JoyButton>
					</JoyContainer>
				</div>
			{/each}

			<JoyButton
				label="+ Add Item"
				class="w-full"
				disabled={isInLimit}
				onclick={addItem}
			/>
		</JoyContainer>
	</JoyContainer>
</JoyDrawer>
