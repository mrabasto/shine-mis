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
	import {
		cashRequests,
		selectedCashRequest,
	} from '$lib/modules/finance/cash-request/stores'
	import {
		ApprovalStatus,
		type CashRequest,
		type CashRequestItem,
	} from '$lib/modules/finance/cash-request/types'
	import { activeRoute } from '$lib/routes'
	import { BorderRounded, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { onMount, tick } from 'svelte'
	import { commonFormat } from '$lib/composables/useDateUtils'
	import { spin } from '$lib/composables/useAnimations'
	import { pushState } from '$app/navigation'
	import JoyIconButton from '$lib/components/Advanced/Button/JoyIconButton.svelte'
	import {
		departmentService,
		departments,
		type Department,
	} from '$lib/modules/departments'
	import { cashRequestService } from '$lib/modules/finance/cash-request'
	import { CashRequestDrawerMode } from '$lib/modules/finance/cash-request/components/types'
	import { Finance } from '$lib/routes/types'
	import { clone } from 'remeda'

	let toast: JoyToast
	let toastVariant: ToastVariant = ToastVariant.INFO
	let isLoading = false
	const { loadDepartments } = departmentService()
	const { loadCashRequests, listCashRequests } = cashRequestService()

	onMount(async () => {
		const loadDepartmentsError = await loadDepartments()

		if (loadDepartmentsError) {
			toast.fire({
				message: 'Error loading departments',
				variant: ToastVariant.ERROR,
			})
		}

		if ($cashRequests.length) return

		const loadCashRequestsError = await loadCashRequests()

		if (loadCashRequestsError) {
			toast.fire({
				message: loadCashRequestsError.message,
				variant: ToastVariant.ERROR,
			})
		}
	})

	const fetchCashRequests = async () => {
		if (isLoading) return
		isLoading = true

		toast.fire({
			message: 'Loading cash requests ..',
			noTimer: true,
		})

		listCashRequests()
			.then((response) => {
				toast.hide()
				$cashRequests = response.items
			})
			.catch((response) => {
				toast.fire({
					message: response.message,
					variant: ToastVariant.ERROR,
				})
			})
			.finally(() => (isLoading = false))
	}

	const updateItem = async (event: CustomEvent<CashRequest>) => {
		const index = $cashRequests.findIndex((c) => c.id === event.detail.id)
		if (index === -1) return

		$cashRequests[index] = event.detail
		$cashRequests = $cashRequests

		toast.fire({
			message: 'Cash request updated',
			variant: ToastVariant.SUCCESS,
		})
	}

	const errorCashRequest = (event: CustomEvent<string>) => {
		toast.fire({
			message: event.detail,
			variant: ToastVariant.ERROR,
		})
	}

	const newRequest = () => {
		pushState('', {
			cashRequestDrawer: {
				isOpen: true,
				drawerMode: CashRequestDrawerMode.CREATE,
			},
		})
	}

	const editCashRequest = (cashRequest: CashRequest) => () => {
		console.log('setting', cashRequest.expand?.requested_by.name, 'as the target')
		$selectedCashRequest = clone(cashRequest)

		tick().then(() => {
			pushState('', {
				cashRequestDrawer: {
					isOpen: true,
					drawerMode: CashRequestDrawerMode.EDIT,
				},
			})
		})
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

	const departmentName = (department?: Department) => {
		if (!department) return '---'

		return department.name.split('_').join(' ')
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
	on:cash-request-create={fetchCashRequests}
	on:cash-request-edit={updateItem}
	on:cash-request-error={errorCashRequest}
/>

<JoyToast
	bind:this={toast}
	target="shell"
	bind:variant={toastVariant}
	id={Finance.CASH_REQUESTS}
/>

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
			{#key isLoading == true}
				<div
					class="inset-0 grid place-items-center"
					in:spin={{ duration: 1000, direction: 'right' }}
				>
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
					<th scope="col" class="px-6 py-3"> Department </th>
					<th scope="col" class="px-6 py-3"> Items </th>
					<th scope="col" class="px-6 py-3"> Request Status </th>
					<th scope="col" class="px-6 py-3"> Approval Status </th>
					<th scope="col" class="px-6 py-3"> Managed By </th>
					<th scope="col" class="px-6 py-3"> Total </th>
					<th scope="col" class="px-6 py-3 sticky right-0 bg-base-200">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each $cashRequests as cashRequest (cashRequest.id)}
					<tr
						class="bg-white group hover:bg-base-100 cursor-pointer select-none"
						on:click={editCashRequest(cashRequest)}
					>
						<td class="px-6 py-4"> {commonFormat(cashRequest.created)}</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
							{cashRequest.expand?.requested_by.name}
						</th>
						<td class="px-6 py-4 capitalize">
							{departmentName(cashRequest.expand?.department)}
						</td>
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
						<td class="px-6 py-4">
							{cashRequest.total_amount || computedTotal(cashRequest.items)}</td
						>
						<td class="text-right sticky right-0 bg-white group-hover:bg-base-100">
							<JoyIconButton
								icon="arrow-right"
								plain
								class="w-full h-full grid place-items-center"
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</JoyContainer>
