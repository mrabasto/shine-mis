import { cubicOut } from 'svelte/easing'

export interface SpinAnimationOptions {
	duration: number
	direction: 'left' | 'right'
}

export const spin = (_node: HTMLElement, options: SpinAnimationOptions) => {
	return {
		duration: options.duration,
		easing: cubicOut,
		css: (t: number) => {
			if (options.direction == 'right') {
				return `transform:
		        rotate(${t * 180}deg)
		      `
			}

			return `transform:
		        rotate(-${t * 180}deg)
		      `
		},
	}
}
