export enum Account {
	INDEX = '/account',
	REGISTER = `${Account.INDEX}/register`,
	SIGN_IN = `${Account.INDEX}/sign-in`,
}

export enum Home {
	INDEX = '/home',
}

export enum Admin {
	INDEX = `${Home.INDEX}/admin`,
	// eslint-disable-next-line perfectionist/sort-enums
	BIKE_ROUTES = `${Admin.INDEX}/bike-routes`,
	THREADS = `${Admin.INDEX}/threads`,
}

export enum BikeRoutes {
	EDITOR = `${Home.INDEX}/bike-routes/editor`,
	INDEX = `${Home.INDEX}/bike-routes`,
	SHOW = `${Home.INDEX}/bike-routes/show`,
}

export enum Thread {
	SHOW = `${Home.INDEX}/thread`,
}

export enum Api {
	BIKE_ROUTES = '/users/bike-routes',
	BIKE_STORE = '/users/bike/shops',
	UPVOTES = '/users/upvotes',
	THREADS = '/users/threads',
}

export enum BikeStore {
	INDEX = `${Home.INDEX}/bike-store`,
	SHOW = `${Home.INDEX}/bike-store/show`,
}
