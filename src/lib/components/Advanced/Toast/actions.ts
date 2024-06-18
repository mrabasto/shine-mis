import type { Action } from 'svelte/action'

type TeleportAttributes = {
	'on:teleport'?: (event: CustomEvent) => void
}
type TeleportAction = Action<HTMLElement, string, TeleportAttributes>

export const teleport: TeleportAction = (node, to: string) => {
	const teleportContainer = document.getElementById(to)

	if (teleportContainer) {
		teleportContainer.appendChild(node)
		const teleportEvent = new CustomEvent('teleport')
		teleportContainer.dispatchEvent(teleportEvent)
	}

	return {
		destroy() {
			node.remove()
		},
	}
}
