<script lang="ts">
	import { writable } from 'svelte/store'
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type SortDirection,
		type ColumnDef,
		type TableOptions,
	} from '@tanstack/svelte-table'
	import {
		attendanceSchedules,
		type AttendanceSchedule,
		attendanceScheduleService,
	} from '$lib/modules/attendance/schedule'
	import { onMount } from 'svelte'
	import { timeFormat } from '$lib/composables/useDateUtils'

	const { loadAttendanceSchedules } = attendanceScheduleService()

	onMount(async () => {
		const loadAttendanceSchedulesError = await loadAttendanceSchedules()

		if (loadAttendanceSchedulesError) {
			console.log({ loadAttendanceSchedulesError })
		}
	})

	const getSortedSymbol = (isSorted: boolean | SortDirection) => {
		return isSorted ? (isSorted === 'asc' ? '☝️' : '👇️') : ''
	}

	const columns: ColumnDef<AttendanceSchedule>[] = [
		{
			accessorKey: 'id',
			header: 'ID',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'expand.user_id.name',
			header: 'User',
			id: 'user.name',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'name',
			header: 'Name',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'start_time',
			header: 'Start Time',
			cell: (info) => timeFormat(info.getValue() as string),
		},
	]

	const options = writable<TableOptions<AttendanceSchedule>>({
		columns,
		data: $attendanceSchedules,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	attendanceSchedules.subscribe((data) => {
		options.update((options) => ({
			...options,
			data,
		}))
	})

	const table = createSvelteTable(options)
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
				<tr class="bg-white hover:bg-base-100 cursor-pointer select-none">
					{#each row.getVisibleCells() as cell}
						<td class="px-6 py-4">
							<svelte:component
								this={flexRender(cell.column.columnDef.cell, cell.getContext())}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
