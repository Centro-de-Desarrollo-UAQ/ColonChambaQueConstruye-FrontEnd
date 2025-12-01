//HOla este codigo basicamente es para guardar el token posteriormente en el layout de applicant estara el de proteccion y pertinencia  
// La idea es que el token dure 1 dia pero eso lo gestiona el backend~Cuitlan
import { create } from 'zustand';
interface AuthState {
  token: string | null;
  id: string | null;
  email: string | null;
  status: string | null;

  login: (data: { id: string; email: string; status: string; token: string }) => void;
  logout: () => void;
  initialize: () => void; 
}
const LOCAL_STORAGE_KEY = 'authToken';

export const useApplicantStore = create<AuthState>((set) => ({
  token: null,
  id: null,
  email: null,
  status: null,

  login: (data) => {
    set({
      token: data.token,
      id: data.id,
      email: data.email,
      status: data.status,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
  },
  // Esto basicamente es para limpiar el token 
  logout: () => {
    set({
      token: null,
      id: null,
      email: null,
      status: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },

  initialize: () => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedToken) {
      set({ token: storedToken });
    }
  },
}));