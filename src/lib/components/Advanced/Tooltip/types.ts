import type { Placement } from '@floating-ui/dom'

export interface FloatingOptions {
	target?: HTMLElement
	floater?: HTMLElement
	placement: Placement
	arrowElement?: HTMLElement
}
