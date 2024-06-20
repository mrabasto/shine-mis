<script lang="ts">
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { activeRoute } from '$lib/routes'
</script>

<JoyText size={TextSize.XL_3} weight={FontWeight.BOLD}>
	{$activeRoute?.label}
</JoyText>
