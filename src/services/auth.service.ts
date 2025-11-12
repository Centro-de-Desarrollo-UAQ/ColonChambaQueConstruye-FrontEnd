import { apiService } from './api.service';

export class AuthService {

	async loginAccount(email: string, password: string, profileType: 'user' | 'companies' | 'administrator') {
		const endpoint = `/auth/${profileType}/login`;

		const response: Response | undefined = await apiService.post(endpoint, { email, password });
		if (!response || !response.ok) {
			const errorData = response
				? await response.json().catch(() => ({ message: 'Login failed' }))
				: { message: 'Login failed' };
			throw new Error((errorData as any).error || (errorData as any).message || 'Login failed');
		}

		const data = await response.json();
		return data;
	}
}

export const authService = new AuthService();