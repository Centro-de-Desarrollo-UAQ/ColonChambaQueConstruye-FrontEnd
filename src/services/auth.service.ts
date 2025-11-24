import { apiService } from './api.service';

export class AuthService {
	async loginAccount(email: string, password: string, profileType: 'user' | 'company' | 'administrator') {
		const endpoint = `/auth/${profileType}/login`;
		const response: Response | undefined = await apiService.post(endpoint, { email, password });

		if (!response || !response.ok) {
			const errorText = await response?.text();
			throw new Error(errorText || 'Login failed');
		}

		const data = await response.json();
		return data;
	}

	async userSignup(body: unknown) {
		const endpoint = '/auth/user/signup'
		const response: Response | undefined = await apiService.post(endpoint, body);
		if (!response || !response.ok) {
			const errorText = await response?.text();
			throw new Error(errorText || 'Signup failed');
		}

		const data = await response.json();
		return data;
	}
}

export const authService = new AuthService();