import type { Action } from 'svelte/action'

type ClickOutsideAttributes = {
	'on:outside'?: (event: CustomEvent) => void
}

type EscapePressAttributes = {
	'on:escape'?: (event: CustomEvent) => void
}

type EscapeEvents = 'keydown' | 'keypress' | 'keyup'
type EscapeConfig = {
	keyevent: EscapeEvents
}

type clickOutsideAction = Action<HTMLElement, any, ClickOutsideAttributes>
type escaprePressAction = Action<HTMLElement, any, EscapePressAttributes>

export default () => {
	const clickOutside: clickOutsideAction = (element) => {
		function handle(event: MouseEvent) {
			const target = event.target as HTMLElement

			const { blocked } = element.dataset

			if (blocked === 'true') return

			if (element && !element.contains(target)) {
				const clickOutsideEvent = new CustomEvent('outside')
				element.dispatchEvent(clickOutsideEvent)
			}
		}

		document.addEventListener('click', handle, true)

		return {
			destroy() {
				document.removeEventListener('click', handle, true)
			},
		}
	}

	const escapePress: escaprePressAction = (
		element,
		config: EscapeConfig = { keyevent: 'keydown' }
	) => {
		function handle(event: KeyboardEvent) {
			const { blocked } = element.dataset
			if (blocked === 'true') return

			if (event.key.toUpperCase() == 'ESCAPE') {
				const escapeEvent = new CustomEvent('escape')
				element.dispatchEvent(escapeEvent)
			}
		}

		window.addEventListener(config.keyevent, handle, true)

		return {
			destroy() {
				window.removeEventListener(config.keyevent, handle, true)
			},
		}
	}

	return {
		clickOutside,
		escapePress,
	}
}
