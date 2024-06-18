import Swal, { type SweetAlertIcon, type SweetAlertPosition } from 'sweetalert2'

const Toast = Swal.mixin({
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer
		toast.onmouseleave = Swal.resumeTimer
		toast.addEventListener('click', () => Swal.close())
	},
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	toast: true,
})

type ToastConfig = {
	icon: SweetAlertIcon
	position: SweetAlertPosition
	text?: string
	title?: string
}

export default () => {
	const toast = (config: ToastConfig) => {
		return Toast.fire(config)
	}

	const successToast = (title: string, text?: string, position: SweetAlertPosition = 'top') =>
		toast({
			icon: 'success',
			position,
			text,
			title,
		})

	const errorToast = (title: string, text?: string, position: SweetAlertPosition = 'top') =>
		toast({
			icon: 'error',
			position,
			text,
			title,
		})

	const confirmPop = (title: string, text: string) =>
		Swal.fire({
			icon: 'warning',
			showCancelButton: true,
			showConfirmButton: true,
			text,
			title,
		})

	return {
		confirmPop,
		errorToast,
		successToast,
		toast,
	}
}
