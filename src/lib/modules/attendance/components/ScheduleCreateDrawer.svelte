<script lang="ts">
	import { run } from 'svelte/legacy'

	import { page } from '$app/stores'
	import JoySliderDrawer from '$lib/components/Advanced/Drawer/JoySliderDrawer.svelte'
	import { writable } from 'svelte/store'

	let isLoading = false
	let isShown = writable(false)
	let moduleLabel = 'Schedule'
	let modeLabel = 'Create New Schedule'

	run(() => {
		$isShown = Boolean($page.state.scheduleCreateDrawer?.isOpen)
	})
</script>

<JoySliderDrawer
	id="schedule-create-slider"
	{isLoading}
	{isShown}
	{modeLabel}
	{moduleLabel}
></JoySliderDrawer>
