
export const API_BASE_URL = '';

export class ApiService {
	private readonly apiBaseUrl: string;

	constructor() {
		this.apiBaseUrl = API_BASE_URL;
	}

	private getHeaders(): Record<string, string> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		return headers;
	}

	async request(endpointPath: string, options: RequestInit = {}) {
		const url = `${this.apiBaseUrl}${endpointPath}`;
		const headers = {
			...this.getHeaders(),
			...((options.headers as Record<string, string>) || {})
		}

		this.getHeaders();

		try {
			const response = fetch(url, {
				...options, headers
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	}

	async get(endpoint: string) {
		return this.request(endpoint, { method: 'GET' });
	}

	async post(endpoint: string, data?: unknown) {
		return this.request(endpoint, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async put(endpoint: string, data?: unknown) {
		return this.request(endpoint, {
			method: 'PUT',
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async delete(endpoint: string) {
		return this.request(endpoint, { method: 'DELETE' });
	}

	async patch(endpoint: string, data?: unknown) {
		return this.request(endpoint, {
			method: 'PATCH',
			body: data ? JSON.stringify(data) : undefined,
		});
	}
}

