<script lang="ts">
	import { clickOutside, escapePress } from '$lib/composables/useActions'

	export let id = 'custom-modal'
	let clazz = ''
	let open = ''
	export { clazz as class }
	$: modalClass = `modal ${open}`
	$: modalBoxClass = `modal-box ${clazz}`

	export function openModal() {
		open = 'modal-open'
	}

	export function closeModal() {
		if (actionBlocked) return false

		open = ''
	}

	export let actionBlocked = false
</script>

<dialog {id} class={modalClass}>
	<div
		class={modalBoxClass}
		data-blocked={actionBlocked}
		use:escapePress
		use:clickOutside
		on:outside={closeModal}
		on:escape={closeModal}
	>
		<slot name="modal-body">
			<h3 class="font-bold text-lg">Hello!</h3>
			<p class="py-4">Press ESC key or click the button below to close</p>
		</slot>
		<div class="modal-action">
			<slot name="modal-action" />
		</div>
	</div>
</dialog>

<style lang="postcss">
	dialog {
		@apply z-[9999];
	}
</style>
