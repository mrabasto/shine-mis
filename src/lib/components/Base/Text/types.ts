export type TextColorValues = (typeof TextColor)[keyof typeof TextColor]
export const TextColor = {
	ACCENT: 'text-accent',
	BASE_100: 'text-base-100',
	BASE_200: 'text-base-200',
	BASE_300: 'text-base-300',
	ERROR: 'text-error',
	GRAY_800: 'text-gray-800',
	INFO: 'text-info',
	INHERIT: 'text-inherit',
	NEUTRAL: 'text-neutral',
	NEUTRAL_CONTENT: 'text-neutral-content',
	PRIMARY: 'text-primary',
	PRIMARY_CONTENT: 'text-primary-content',
	SECONDARY: 'text-secondary',
	SUCCESS: 'text-success',
	WARNING: 'text-warning',
	WARNING_CONTENT: 'text-warning-content',
} as const

export type TextTagValues = (typeof TextTag)[keyof typeof TextTag]
export const TextTag = {
	H1: 'h1',
	H2: 'h2',
	H3: 'h3',
	H4: 'h4',
	PARA: 'p',
	SPAN: 'span',
} as const

export type TextSizeValues = (typeof TextSize)[keyof typeof TextSize]
export const TextSize = {
	BASE: 'text-base',
	LG: 'text-lg',
	SM: 'text-sm',
	XL: 'text-xl',
	XL_2: 'text-2xl',
	XL_3: 'text-3xl',
	XL_4: 'text-4xl',
	XL_6: 'text-6xl',
	XS: 'text-xs',
} as const

export type FontWeightValues = (typeof FontWeight)[keyof typeof FontWeight]
export const FontWeight = {
	BOLD: 'font-bold',
	LIGHT: 'font-light',
	NORMAL: 'font-normal',
	SEMIBOLD: 'font-semibold',
} as const
