import type { Action } from 'svelte/action'

type ClickMeAttributes = {
	'on:click-me'?: (event: CustomEvent) => void
}

type ClickOutsideAttributes = {
	'on:outside'?: (event: CustomEvent) => void
}

type CtrlEnterAttributes = {
	'on:ctrl-enter'?: (event: CustomEvent) => void
}

type EscapePressAttributes = {
	'on:escape'?: (event: CustomEvent) => void
}

type EscapeEvents = 'keydown' | 'keypress' | 'keyup'
type EscapeConfig = {
	keyevent: EscapeEvents
}

type clickMeAction = Action<HTMLElement, any, ClickMeAttributes>
type clickOutsideAction = Action<
	HTMLElement,
	Array<string> | undefined,
	ClickOutsideAttributes
>
type ctrlEnterAction = Action<HTMLElement, any, CtrlEnterAttributes>
type escapePressAction = Action<HTMLElement, any, EscapePressAttributes>

export const clickMe: clickMeAction = (element) => {
	function handle(event: MouseEvent) {
		const target = event.target as HTMLElement
		const currentTarget = event.currentTarget as HTMLElement

		const { blocked } = element.dataset

		if (blocked === 'true') return

		if (target === currentTarget) {
			const clickMeEvent = new CustomEvent('click-me')
			element.dispatchEvent(clickMeEvent)
		}
	}

	element.addEventListener('click', handle, true)

	return {
		destroy() {
			element.removeEventListener('click', handle, true)
		},
	}
}

export const clickOutside: clickOutsideAction = (
	element,
	otherElements?: Array<string>
) => {
	function handle(event: MouseEvent) {
		const target = event.target as HTMLElement

		const { blocked } = element.dataset

		if (blocked === 'true') return

		const checkClosest = () => otherElements?.some((el) => target.closest('#' + el))

		if (element && !element.contains(target) && !checkClosest()) {
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

export const ctrlEnter: ctrlEnterAction = (element) => {
	function handle(event: KeyboardEvent) {
		const { blocked } = element.dataset
		if (blocked === 'true') return

		if (event.ctrlKey && event.key.toUpperCase() == 'ENTER') {
			const escapeEvent = new CustomEvent('ctrl-enter')
			element.dispatchEvent(escapeEvent)
		}
	}

	window.addEventListener('keydown', handle, true)

	return {
		destroy() {
			window.removeEventListener('keydown', handle, true)
		},
	}
}

export const escapePress: escapePressAction = (
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
