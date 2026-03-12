// src/app/store/authCompanyStore.ts
import { create } from 'zustand';

interface CompanyAuthState {
  token: string | null;
  companyId: string | null;
  email: string | null;
  status: string | null;

  login: (data: {
    companyId?: string;
    id?: string;
    email: string;
    status: string;
    token: string;
  }) => void;

  clearCompanySession: () => void;
  logoutCompany: () => void;
  initialize: () => void;

  saveCompanyData: (data: {
    companyId: string;
    email: string;
    status: string;
    token: string;
  }) => void;
}

const LOCAL_STORAGE_TOKEN_KEY = 'authToken';
const LOCAL_STORAGE_COMPANY_ID_KEY = 'companyId';
const LOCAL_STORAGE_EMAIL_KEY = 'companyEmail';
const LOCAL_STORAGE_STATUS_KEY = 'companyStatus';

export const useCompanyStore = create<CompanyAuthState>((set) => ({
  token: null,
  companyId: null,
  email: null,
  status: null,

  login: ({ companyId, id, email, status, token }) => {
    const finalCompanyId = companyId ?? id ?? null;

    set({
      companyId: finalCompanyId,
      email,
      status,
      token,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

      if (finalCompanyId) {
        localStorage.setItem(LOCAL_STORAGE_COMPANY_ID_KEY, finalCompanyId);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_COMPANY_ID_KEY);
      }

      localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
      localStorage.setItem(LOCAL_STORAGE_STATUS_KEY, status);
    }
  },

  clearCompanySession: () => {
    set({
      token: null,
      companyId: null,
      email: null,
      status: null,
    });

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_COMPANY_ID_KEY);
        localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
        localStorage.removeItem(LOCAL_STORAGE_STATUS_KEY);
      } catch {}
    }
  },

  logoutCompany: () => {
    set({
      token: null,
      companyId: null,
      email: null,
      status: null,
    });

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_COMPANY_ID_KEY);
        localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
        localStorage.removeItem(LOCAL_STORAGE_STATUS_KEY);
      } catch {}
    }
  },

  initialize: () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const companyId = localStorage.getItem(LOCAL_STORAGE_COMPANY_ID_KEY);
    const email = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
    const status = localStorage.getItem(LOCAL_STORAGE_STATUS_KEY);

    if (token && companyId) {
      set({
        token,
        companyId,
        email: email ?? null,
        status: status ?? null,
      });
    } else {
      set({
        token: null,
        companyId: null,
        email: null,
        status: null,
      });

      try {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_COMPANY_ID_KEY);
        localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
        localStorage.removeItem(LOCAL_STORAGE_STATUS_KEY);
      } catch {}
    }
  },

  saveCompanyData: ({ companyId, email, status, token }) => {
    set({ companyId, email, status, token });

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      localStorage.setItem(LOCAL_STORAGE_COMPANY_ID_KEY, companyId);
      localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
      localStorage.setItem(LOCAL_STORAGE_STATUS_KEY, status);
    }
  },
}));