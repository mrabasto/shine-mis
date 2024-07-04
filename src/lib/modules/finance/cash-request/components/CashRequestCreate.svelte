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
	import type { CashRequestItem } from '$lib/modules/finance/cash-request/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import { uid } from 'radash'
	import { cashRequestService } from '$lib/modules/finance/cash-request/services'
	import {
		CashRequestEvent,
		type CashRequestDispatch,
	} from '$lib/modules/finance/cash-request/events'
	import { createEventDispatcher, tick } from 'svelte'
	import { slide } from 'svelte/transition'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import { ctrlEnter, ctrlShiftEnter, escapePress } from '$lib/composables/useActions'
	import { page } from '$app/stores'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyTooltip from '$lib/components/Advanced/Tooltip/JoyTooltip.svelte'

	export let maxLimit = 10

	let items: CashRequestItem[] = [],
		isLoading = false,
		toast: JoyToast

	const dispatch = createEventDispatcher<CashRequestDispatch>()
	const { createCashRequest } = cashRequestService()

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
			return toast.fire({
				message: 'Invalid items',
				variant: ToastVariant.ERROR,
			})
		}

		isLoading = true
		createCashRequest(items)
			.then((response) => {
				dispatch(CashRequestEvent.CREATE, response)

				tick().then(() => {
					items = []
					hide()
				})
			})
			.catch((response) => dispatch(CashRequestEvent.ERROR, response.message))
			.finally(() => (isLoading = false))
	}

	export const show = () => (isShown = true)
	export const hide = () => {
		history.back()
	}

	$: notValid =
		items.length === 0 ||
		items.some((i) => i.label.length === 0 || !i.price || i.price === 0)

	$: isInLimit = items.length === maxLimit
	$: isShown = $page.state.cashRequestCreate
</script>

<JoyDrawer blocked={isLoading} {isShown} {hide}>
	<section
		use:ctrlEnter
		use:escapePress
		on:escape={hide}
		on:ctrl-enter={addItem}
		use:ctrlShiftEnter
		on:ctrl-shift-enter={submit}
	/>

	<JoyToast bind:this={toast} target="shell" />

	<JoyItemLoader {isLoading} />

	<JoyContainer
		class="w-full"
		alignItems={AlignItems.CENTER}
		padding={ContainerPadding.MD}
	>
		<JoyButton
			class="rounded-full btn-circle"
			variant={ButtonVariant.GHOST}
			on:click={hide}
		>
			<JoyIcon icon="xmark" />
		</JoyButton>
		<JoyContainer>
			<JoyText weight={FontWeight.LIGHT} size={TextSize.LG}>Cash Requests</JoyText>
			<JoyText weight={FontWeight.NORMAL} size={TextSize.LG}>/</JoyText>
			<JoyText weight={FontWeight.BOLD} size={TextSize.LG}>New Request</JoyText>
		</JoyContainer>

		<JoyTooltip class="ml-auto" placement="left">
			<JoyIcon icon="question-mark-circle" />

			<JoyContainer
				slot="tooltip-content"
				class="w-full"
				padding={ContainerPadding.XS}
				col
			>
				<span>(Esc) Close</span>
				<span>(Ctrl+Enter) Add item</span>
				<span>(Ctrl+Shift+Enter) Submit items</span>
			</JoyContainer>
		</JoyTooltip>
	</JoyContainer>

	<JoyContainer
		padding={ContainerPadding.NONE}
		class="w-full px-8 py-0"
		justify={Justify.BETWEEN}
		alignItems={AlignItems.CENTER}
	>
		<JoyText size={TextSize.LG} class="flex items-center gap-2">
			<JoyIcon icon="shopping-bag-plus" />
			Items
		</JoyText>
		<JoyButton
			label="Submit"
			variant={ButtonVariant.ACCENT}
			bind:disabled={notValid}
			on:click={submit}
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
							on:click={() => removeItem(item)}
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
				on:click={addItem}
			/>
		</JoyContainer>
	</JoyContainer>
</JoyDrawer>
