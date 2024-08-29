<script lang="ts">
	import JoyIconButton from '$lib/components/Advanced/Button/JoyIconButton.svelte'

	import { JoyDataTableEvent, type JoyDataTableDispatch } from './types'
	import { createEventDispatcher } from 'svelte'
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortDirection,
		type TableOptions,
	} from '@tanstack/svelte-table'
	import { writable, type Writable } from 'svelte/store'

	type T = $$Generic

	export let data: Writable<Array<T>>
	export let columns: Array<ColumnDef<T>>

	const options = writable<TableOptions<T>>({
		columns,
		data: $data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	data.subscribe((data) => {
		options.update((options) => ({
			...options,
			data,
		}))
	})

	const table = createSvelteTable(options)

	const dispatch = createEventDispatcher<JoyDataTableDispatch<T>>()

	const getSortedSymbol = (isSorted: boolean | SortDirection) => {
		return isSorted ? (isSorted === 'asc' ? '☝️' : '👇️') : ''
	}

	const rowClicked = (data: T) => dispatch(JoyDataTableEvent.ROW_SELECTED, data)
</script>

<div class="relative rounded-lg overflow-x-auto w-full h-full">
	<table class="w-full text-sm text-left rtl:text-right text-gray-600">
		<thead class="text-xs text-gray-600 uppercase bg-base-200">
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colspan={header.colSpan} scope="col" class="px-6 py-3">
							{#if !header.isPlaceholder}
								<button
									disabled={!header.column.getCanSort()}
									on:click={header.column.getToggleSortingHandler()}
									class="uppercase"
								>
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>

									<span>
										{getSortedSymbol(header.column.getIsSorted())}
									</span>
								</button>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>

		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr
					class="bg-white group hover:bg-base-100 cursor-pointer select-none"
					on:click={() => rowClicked(row.original)}
				>
					{#each row.getVisibleCells() as cell}
						{#if cell.column.id === 'actions'}
							<td class="text-right sticky right-0 bg-white group-hover:bg-base-100">
								<JoyIconButton
									icon="arrow-right"
									plain
									class="w-full h-full grid place-items-center"
								/>
							</td>
						{:else}
							<td class="px-6 py-4">
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
