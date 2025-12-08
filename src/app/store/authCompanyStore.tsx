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


const LOCAL_STORAGE_KEY_COMPANY = 'authToken'; 
const LOCAL_STORAGE_ID_COMPANY = "companyId"
const LOCAL_STORAGE_STATUS_COMPANY = "companyStatus";

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
    localStorage.setItem(LOCAL_STORAGE_ID_COMPANY, data.companyId);
    localStorage.setItem(LOCAL_STORAGE_STATUS_COMPANY, data.status);

  },

 
  logout: () => {
    set({
      token: null,
      companyId: null,
      email: null,
      status: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY_COMPANY);
    localStorage.removeItem(LOCAL_STORAGE_ID_COMPANY);
  },

   
  initialize: () => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_COMPANY);
    const storedComanyId = localStorage.getItem(LOCAL_STORAGE_ID_COMPANY);

    if (storedToken && storedComanyId) {
      set({ 
        token: storedToken, 
        companyId:storedComanyId
      });
      
    }
  },
}));