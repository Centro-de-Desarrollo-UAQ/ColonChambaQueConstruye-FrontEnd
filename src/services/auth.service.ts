import { apiService } from './api.service';

export class AuthService {
	async loginAccount(email: string, password: string, profileType: 'user' | 'companies' | 'administrator') {
		const endpoint = `/auth/${profileType}/login`;
		const response: Response | undefined = await apiService.post(endpoint, { email, password });

		if (!response || !response.ok) {
			const errorText = await response?.text();
			throw new Error(errorText || 'Login failed');
		}

		const data = await response.json();
		return data;
	}
}

export const authService = new AuthService();