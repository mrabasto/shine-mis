import { quintOut } from 'svelte/easing'

export const spin = (_node: HTMLElement, { duration = 1000 } = {}) => {
	return {
		duration,
		easing: quintOut,
		css: (t: number) => {
			return `transform:
		        rotate(${t * 180}deg)
		      `
		},
	}
}
