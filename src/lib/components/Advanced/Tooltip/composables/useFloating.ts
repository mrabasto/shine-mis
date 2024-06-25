import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import type { FloatingOptions } from '$lib/components/Advanced/Tooltip/types'
import { sift } from 'radash'

export const floating = async (options: FloatingOptions = { placement: 'right' }) => {
	const { target, floater, arrowElement, placement } = options

	if (!target || !floater) return

	const position = await computePosition(target, floater, {
		placement,
		middleware: sift([
			offset(6),
			flip(),
			shift({ padding: 15 }),
			arrowElement ? arrow({ element: arrowElement }) : null,
		]),
	})

	Object.assign(floater.style, {
		left: `${position.x}px`,
		top: `${position.y}px`,
	})

	if (!arrowElement || !position.middlewareData.arrow) return

	const { x: arrowX, y: arrowY } = position.middlewareData.arrow

	const staticSide = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
	}[position.placement.split('-')[0]]

	const style: Record<string, string> = {
		left: arrowX != null ? `${arrowX}px` : '',
		top: arrowY != null ? `${arrowY}px` : '',
		right: '',
		bottom: '',
		[staticSide]: '-4px',
	}

	Object.assign(arrowElement.style, { ...style })
}
