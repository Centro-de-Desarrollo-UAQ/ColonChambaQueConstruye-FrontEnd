import { ApiService } from "./api.service";

export class AuthService {
	constructor(private apiService: ApiService) {
	}

	async loginAccount(email: string, password: string, profileType: 'users' | 'companies' | 'administrator') {
		const endpoint = `/auth/${profileType}/login`;

		const response: Response | undefined = await this.apiService.post(endpoint, { email, password });
		if (!response || !response.ok) {
			const errorData = response
				? await response.json().catch(() => ({ message: 'Login failed' }))
				: { message: 'Login failed' };
			throw new Error((errorData as any).error || (errorData as any).message || 'Login failed');
		}

		const data = await response.json();
		console.log('login', data);
	}
}