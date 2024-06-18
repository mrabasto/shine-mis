import type { LoadingDispatch } from '$lib/components/Advanced/Thread/types'
import type { BikeRouteModel } from '$lib/modules/bike-routes/types'

export enum BikeRouteEvent {
	DELETE = 'bike-route-delete',
}

export interface BikeRouteItemEvents {
	[BikeRouteEvent.DELETE]: BikeRouteDeleteDispatch
}

export interface BikeRouteDeleteDispatch extends LoadingDispatch {
	bikeRoute: BikeRouteModel
}
