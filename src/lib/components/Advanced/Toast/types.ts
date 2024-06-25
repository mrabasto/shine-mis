export enum ToastVariant {
	ERROR = 'border-error text-error',
	INFO = 'border-info',
	SUCCESS = 'border-success',
	WARNING = 'border-warning',
}

export interface ToastOptions {
	message: string
	noTimer?: boolean
	variant?: ToastVariant
}
