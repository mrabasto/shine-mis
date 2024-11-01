<script lang="ts">
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { Shadow } from '$lib/types/Shadow'

	interface Props {
		title?: string
		shadow?: Shadow
		class?: string
		children?: import('svelte').Snippet
		actions?: import('svelte').Snippet
	}

	let {
		title = 'Card Title',
		shadow = Shadow.XL,
		class: clazz = '',
		children,
		actions,
	}: Props = $props()

	let cardClass = $derived(`card bg-base-100 ${shadow} ${clazz}`)
</script>

<div class={cardClass}>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		{@render children?.()}
		<div class="card-actions justify-end">
			{#if actions}{@render actions()}{:else}
				<JoyButton label="Card Action" />
			{/if}
		</div>
	</div>
</div>
