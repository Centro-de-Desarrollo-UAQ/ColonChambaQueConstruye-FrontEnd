import { create } from 'zustand';


interface CompanyAuthState {
  token: string | null;
  companyId: string | null; 
  email: string | null;
  status: string | null; 

  
  login: (data: { companyId: string; email: string; status: string; token: string }) => void;
  
  logout: () => void;
  
  initialize: () => void; 
}


const LOCAL_STORAGE_KEY_COMPANY = 'companyAuthToken'; 

export const useCompanyStore = create<CompanyAuthState>((set) => ({
  token: null,
  companyId: null,
  email: null,
  status: null,


  login: (data) => {
    set({
      token: data.token,
      companyId: data.companyId,
      email: data.email,
      status: data.status,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY_COMPANY, data.token);
  },

 
  logout: () => {
    set({
      token: null,
      companyId: null,
      email: null,
      status: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY_COMPANY);
  },

   
  initialize: () => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_COMPANY);
    if (storedToken) {
      set({ token: storedToken });
    }
  },
}));