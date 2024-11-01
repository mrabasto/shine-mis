<script lang="ts">
	import JoyGraphic404 from '$lib/components/Base/Graphic/Variants/JoyGraphic404.svelte'
	interface Props {
		class?: string
		graphic?: keyof typeof graphics
	}

	let { class: clazz = '', graphic = 'notFound' }: Props = $props()

	const graphics = {
		notFound: JoyGraphic404,
	}

	let iconClass = $derived(`${clazz}`)

	const SvelteComponent = $derived(graphics[graphic])
</script>

<SvelteComponent class={iconClass} />
