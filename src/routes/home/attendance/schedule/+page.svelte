<script lang="ts">
	import { type ColumnDef } from '@tanstack/svelte-table'
	import {
		attendanceSchedules,
		type AttendanceSchedule,
		attendanceScheduleService,
		selectedAttendanceSchedule,
	} from '$lib/modules/attendance/schedule'
	import { onMount, tick } from 'svelte'
	import { timeFormat } from '$lib/composables/useDateUtils'
	import JoyDataTable from '$lib/components/Advanced/DataTable/JoyDataTable.svelte'
	import { clone } from 'remeda'
	import ScheduleCreateDrawer from '$lib/modules/attendance/components/ScheduleCreateDrawer.svelte'
	import { pushState } from '$app/navigation'

	const { loadAttendanceSchedules } = attendanceScheduleService()

	onMount(async () => {
		const loadAttendanceSchedulesError = await loadAttendanceSchedules()

		if (loadAttendanceSchedulesError) {
			console.log({ loadAttendanceSchedulesError })
		}
	})

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

		{
			accessorKey: 'end_time',
			header: 'End Time',
			cell: (info) => timeFormat(info.getValue() as string),
		},

		{
			id: 'actions',
			cell: (props) => props.row,
		},
	]

	const editSchedule = (event: CustomEvent<AttendanceSchedule>) => {
		const schedule = event.detail
		console.log({ schedule })

		schedule.name = 'KASJDLKASJDLAKSJDLASJDLKJ'
		$selectedAttendanceSchedule = clone(schedule)

		tick().then(() => {
			pushState('', {
				scheduleCreateDrawer: {
					isOpen: true,
				},
			})
		})
	}
</script>

<ScheduleCreateDrawer />

<JoyDataTable
	data={attendanceSchedules}
	{columns}
	on:datatable-row-selected={editSchedule}
/>
