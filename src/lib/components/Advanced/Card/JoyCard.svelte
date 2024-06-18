<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { Shadow } from '$lib/types/Shadow'

	export let title = 'Card Title'
	export let shadow: Shadow = Shadow.XL
	let clazz = ''
	export { clazz as class }

	$: cardClass = `card bg-base-100 ${shadow} ${clazz}`
</script>

<div class={cardClass}>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<slot />
		<div class="card-actions justify-end">
			<slot name="actions">
				<JoyButton label="Card Action" />
			</slot>
		</div>
	</div>
</div>
