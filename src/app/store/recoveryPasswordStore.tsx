import { create } from 'zustand';

interface RecoveryState {
  email: string | null;
  verificationId: string | null;
  
  setRecoveryData: (email: string, verificationId: string) => void;
  resetRecoveryData: () => void;
}

export const useRecoveryStore = create<RecoveryState>((set) => ({
  email: null,
  verificationId: null,

  setRecoveryData: (email, verificationId) => 
    set({ email, verificationId }),

  resetRecoveryData: () => 
    set({ email: null, verificationId: null }),
}));