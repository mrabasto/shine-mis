<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { getCashRequests } from '$lib/modules/finance/cash-request/services'
	import { cashRequests } from '$lib/modules/finance/cash-request/stores'
	import { activeRoute } from '$lib/routes'
	import { BorderRounded } from '$lib/types'
	import { onMount } from 'svelte'

	onMount(() => {
		getCashRequests()
			.then((response) => {
				$cashRequests = response.items
			})
			.catch(console.log)
	})
</script>

<JoyText size={TextSize.XL_3} weight={FontWeight.BOLD}>
	{$activeRoute?.label}
</JoyText>

<JoyContainer class="bg-primary w-full h-[300px] shrink-0" rounded={BorderRounded.LG}
></JoyContainer>

<JoyContainer class="w-full">
	<JoyInput
		class="w-full bg-secondary/25 placeholder-secondary-content/50"
		placeholder="Search"
		rounded={BorderRounded.LG}
	/>
</JoyContainer>

<JoyContainer class="w-full shrink-0" rounded={BorderRounded.LG}>
	<div class="relative rounded-lg overflow-x-auto w-full h-full">
		<table class="w-full text-sm text-left rtl:text-right text-gray-600">
			<thead class="text-xs text-gray-600 uppercase bg-base-200">
				<tr>
					<th scope="col" class="px-6 py-3"> Requested By </th>
					<th scope="col" class="px-6 py-3"> Request Status </th>
					<th scope="col" class="px-6 py-3"> Approval Status </th>
					<th scope="col" class="px-6 py-3"> Approved By </th>
					<th scope="col" class="px-6 py-3">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each $cashRequests as cashRequest (cashRequest.id)}
					<tr class="bg-white hover:bg-base-100">
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
							{cashRequest.expand?.requested_by.name}
						</th>
						<td class="px-6 py-4"> {cashRequest.request_status}</td>
						<td class="px-6 py-4"> {cashRequest.approval_status}</td>
						<td class="px-6 py-4"> {cashRequest.expand?.approved_by.name}</td>
						<td class="px-6 py-4 text-right">
							<a
								href="#"
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
