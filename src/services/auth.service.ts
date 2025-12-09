// src/services/auth.service.ts
import { apiService } from './api.service';

export class AuthService {

  async loginAccount(
    email: string,
    password: string,
    profileType: 'user' | 'company' | 'administrator'
  ) {
    const endpoint = `/auth/${profileType}/login`;

    const response = await apiService.post(endpoint, { email, password });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    const data = await response.json();
    return data;
  }

  async userSignup(
    profileType: 'user' | 'employer' | 'administrator',
    body: unknown
  ) {
    const endpoint = `/auth/${profileType}/signup`;

    const response = await apiService.post(endpoint, body);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Signup failed');
    }

    const data = await response.json();
    return data;
  }
}

export const authService = new AuthService();
