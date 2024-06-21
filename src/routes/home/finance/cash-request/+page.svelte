<script lang="ts">
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Stroke } from '$lib/components/Base/Icon/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import CashRequestCreate from '$lib/modules/finance/cash-request/components/CashRequestCreate.svelte'
	import { getCashRequests } from '$lib/modules/finance/cash-request/services'
	import { cashRequests } from '$lib/modules/finance/cash-request/stores'
	import {
		ApprovalStatus,
		type CashRequestItem,
	} from '$lib/modules/finance/cash-request/types'
	import { activeRoute } from '$lib/routes'
	import { BorderRounded, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { onMount } from 'svelte'
	import { dateFromFormat } from '$lib/composables/useDateUtils'
	import { spin } from '$lib/composables/useAnimations'

	let toast: JoyToast
	let cashRequestCreate: CashRequestCreate
	let toastVariant: ToastVariant = ToastVariant.INFO
	let spinAnimate = false,
		isLoading = false

	onMount(() => {
		if ($cashRequests.length) return

		getCashRequests()
			.then((response) => {
				$cashRequests = response.items
			})
			.catch((response) => {
				toast.setVariant(ToastVariant.ERROR)
				toast.toggleShown(response.message)
			})
	})

	const fetchCashRequests = async () => {
		if (isLoading) return
		spinAnimate = !spinAnimate
		isLoading = true
		toast.setVariant(ToastVariant.INFO)
		toast.setNoTimer(true)
		toast.toggleShown('Loading cash requests ..')

		getCashRequests()
			.then((response) => {
				toast.toggleShown()
				$cashRequests = response.items
			})
			.catch((response) => {
				toast.setNoTimer(false)
				toast.setVariant(ToastVariant.ERROR)
				toast.toggleShown(response.message)
			})
			.finally(() => (isLoading = false))
	}

	const errorCashRequest = (event: CustomEvent<string>) => {
		toast.setNoTimer(false)
		toast.setVariant(ToastVariant.ERROR)
		toast.toggleShown(event.detail)
	}

	const newRequest = () => {
		cashRequestCreate.show()
	}

	const approvalBadge = (approvalStatus: ApprovalStatus) => {
		const badgeClass = 'badge uppercase font-semibold'
		switch (approvalStatus) {
			case ApprovalStatus.PENDING:
				return `${badgeClass} badge-warning`
			case ApprovalStatus.APPROVED:
				return `${badgeClass} badge-success`
			case ApprovalStatus.DECLINED:
				return `${badgeClass} badge-error`
		}
	}

	const requestedItems = (items: CashRequestItem[]) => {
		return items
			.map((item) => {
				return item.label
			})
			.join(', ')
	}

	const computedTotal = (items: CashRequestItem[]) => {
		return items.reduce((total, item) => {
			total += Number(item.price)
			return total
		}, 0)
	}
</script>

<CashRequestCreate
	bind:this={cashRequestCreate}
	on:cash-request-create={fetchCashRequests}
	on:cash-request-error={errorCashRequest}
/>

<JoyToast bind:this={toast} target="shell" bind:variant={toastVariant} />

<JoyContainer class="w-full" justify={Justify.BETWEEN} alignItems={AlignItems.CENTER}>
	<JoyContainer alignItems={AlignItems.CENTER}>
		<JoyText size={TextSize.XL_3} weight={FontWeight.BOLD}>
			{$activeRoute?.label}
		</JoyText>

		<JoyButton
			variant={ButtonVariant.GHOST}
			on:click={fetchCashRequests}
			class="btn-circle relative"
		>
			{#key spinAnimate}
				<div class="inset-0 grid place-items-center" in:spin>
					<JoyIcon icon="refresh-double" />
				</div>
			{/key}
		</JoyButton>
	</JoyContainer>

	<JoyContainer alignItems={AlignItems.CENTER}>
		<JoyButton variant={ButtonVariant.PRIMARY} size={ButtonSize.SM} on:click={newRequest}>
			<JoyIcon icon="plus-circle-solid" stroke={Stroke.TRANSPARENT} />
			New Request
		</JoyButton>
	</JoyContainer>
</JoyContainer>

<JoyContainer class="w-full">
	<JoyInput
		class="w-full bg-base-200/75 placeholder-secondary-content/50"
		placeholder="Search"
		rounded={BorderRounded.LG}
	/>
</JoyContainer>

<JoyContainer class="w-full shrink-0" rounded={BorderRounded.LG}>
	<div class="relative rounded-lg overflow-x-auto w-full h-full">
		<table class="w-full text-sm text-left rtl:text-right text-gray-600">
			<thead class="text-xs text-gray-600 uppercase bg-base-200">
				<tr>
					<th scope="col" class="px-6 py-3"> Requested At </th>
					<th scope="col" class="px-6 py-3"> Requested By </th>
					<th scope="col" class="px-6 py-3"> Items </th>
					<th scope="col" class="px-6 py-3"> Request Status </th>
					<th scope="col" class="px-6 py-3"> Approval Status </th>
					<th scope="col" class="px-6 py-3"> Managed By </th>
					<th scope="col" class="px-6 py-3"> Total </th>
					<th scope="col" class="px-6 py-3">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each $cashRequests as cashRequest (cashRequest.id)}
					<tr class="bg-white hover:bg-base-100">
						<td class="px-6 py-4"> {dateFromFormat(cashRequest.created)}</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
							{cashRequest.expand?.requested_by.name}
						</th>
						<td class="px-6 py-4"> {requestedItems(cashRequest.items)}</td>
						<td class="px-6 py-4"> {cashRequest.request_status || '---'}</td>
						<td class="px-6 py-4">
							<span class={approvalBadge(cashRequest.approval_status)}>
								{cashRequest.approval_status}
							</span>
						</td>
						<td class="px-6 py-4 font-semibold text-gray-900">
							{cashRequest.expand?.approved_by?.name ?? 'None'}</td
						>
						<td class="px-6 py-4"> {computedTotal(cashRequest.items)}</td>
						<td class="px-6 py-4 text-right">
							<a
								href="/"
								class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>Edit</a
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</JoyContainer>
