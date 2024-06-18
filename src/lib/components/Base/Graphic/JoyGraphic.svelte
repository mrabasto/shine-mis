<script lang="ts">
	let clazz = ''
	export { clazz as class }
	export let graphic: keyof typeof graphics = 'notFound'

	import JoyGraphic404 from '$lib/components/Base/Graphic/Variants/JoyGraphic404.svelte'

	const graphics = {
		notFound: JoyGraphic404,
	}

	$: iconClass = `${clazz}`
</script>

<svelte:component this={graphics[graphic]} class={iconClass} />
