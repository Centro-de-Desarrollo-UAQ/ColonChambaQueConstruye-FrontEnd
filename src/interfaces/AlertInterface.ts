
export type AlertState = {
  type: 'error' | 'warning';
  title: string;
  description: string;
} | null;

export type HttpErrorPayload = {
  status?: number; // 400, 409, etc.
  message?: string;
};