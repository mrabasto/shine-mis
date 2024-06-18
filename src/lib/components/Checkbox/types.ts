import { Colors } from '$lib/types/Colors'

export enum CheckboxSize {
	LG = 'checkbox-lg',
	MD = 'checkbox-md',
	SM = 'checkbox-sm',
	XS = 'checkbox-xs',
}

export enum CheckboxVariant {
	ACCENT = `checkbox-${Colors.ACCENT}`,
	ERROR = `checkbox-${Colors.ERROR}`,
	INFO = `checkbox-${Colors.INFO}`,
	NEUTRAL = `checkbox-${Colors.NEUTRAL}`,
	PRIMARY = `checkbox-${Colors.PRIMARY}`,
	SECONDARY = `checkbox-${Colors.SECONDARY}`,
	SUCCESS = `checkbox-${Colors.SUCCESS}`,
	WARNING = `checkbox-${Colors.WARNING}`,
}
