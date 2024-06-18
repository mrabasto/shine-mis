<script lang="ts">
	import {
		createColumnHelper,
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type TableOptions,
	} from '@tanstack/svelte-table'
	import type { ThreadDto } from '$lib/components/Advanced/Table/types'
	import { writable } from 'svelte/store'
	import useService from '$lib/composables/useService'
	import type { UseAuth } from '$lib/modules/auth/composables/useAuth'
	import { ServiceKey } from '$lib/services/service'
	import usePermission from '$lib/composables/usePermission'

	const { get } = useService()
	const { user, token } = get<UseAuth>(ServiceKey.USER)
	const { isAdmin } = usePermission()
	let userIsAdmin = false

	$: if ($user) {
		userIsAdmin = isAdmin($user)
	}

	const isOwnedByUser = (threadId: number) => threadId == $user?.id

	export let tableData: Array<any>

	const columnHelper = createColumnHelper<ThreadDto>()

	const defaultColumns = [
		columnHelper.group({
			header: 'Thread',
			footer: (props) => props.column.id,
			columns: [
				columnHelper.accessor('id', {
					header: () => 'Thread ID',
					cell: (props) => `THREAD_${props.getValue()}`,
				}),

				columnHelper.accessor('title', {
					header: () => 'Title',
					cell: (props) => props.getValue(),
				}),

				columnHelper.accessor('status', {
					header: () => 'Status',
					cell: (props) => props.getValue(),
					footer: (props) => props.column.id,
				}),
			],
		}),

		columnHelper.display({
			id: 'actions',
			header: 'Actions',
			footer: (props) => props.column.id,
		}),
	]

	const options = writable<TableOptions<ThreadDto>>({
		data: tableData,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: tableData,
		}))
	}

	const table = createSvelteTable(options)

	$: tableData, rerender()
</script>

<!-- @TODO: Finish working with modular table -->
<table class="table">
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(header.column.columnDef.header, header.getContext())}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows as row}
			<tr class="hover:bg-yellow-50">
				<slot name="rows" {row} cells={row.getVisibleCells()}>
					{#each row.getVisibleCells() as cell}
						<td>
							{#if cell.column.id === 'actions'}
								<slot name="row-actions" {row} {cell} {table} />
							{:else}
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							{/if}
						</td>
					{/each}
				</slot>
			</tr>
		{/each}
	</tbody>
</table>
