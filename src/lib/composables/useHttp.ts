import { PUBLIC_APP_URL } from '$env/static/public'
import { Http } from '$lib/services/http'

export default () => {
	const http = new Http({
		baseURL: `${PUBLIC_APP_URL}/api`,
		timeout: 60000,
		// withCredentials: true,
		// xsrfCookieName: "XSRF-TOKEN",
		// xsrfHeaderName: "X-XSRF-TOKEN",
	})

	return {
		http,
	}
}
