export enum JoyDataTableEvent {
	ROW_SELECTED = 'datatable-row-selected',
}

export interface JoyDataTableDispatch<T> {
	[JoyDataTableEvent.ROW_SELECTED]: T
}
