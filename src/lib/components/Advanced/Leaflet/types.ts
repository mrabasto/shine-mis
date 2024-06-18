import type Geocoder from 'leaflet-control-geocoder'

export interface MapContext {
	getMap: () => L.Map | undefined
}

export interface LayerContext {
	getDuplicateIconElement?: () => Node
	getGeocoder?: () => Geocoder
	getIcon?: (element: HTMLElement | string, width: number, height: number) => L.DivIcon
	getIconInstance?: () => L.DivIcon
	getMarker?: (map: L.Map) => L.Marker
}

export interface LeafletContext {
	layerContext?: LayerContext
	mapContext?: MapContext
}
