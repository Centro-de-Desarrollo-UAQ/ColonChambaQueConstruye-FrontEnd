export type Candidate = {
  id: string;
  name: string;
  status: 'toreview' | 'candidate' | 'rejected' | 'approved';
  email: string;
  phone: string;
  createdAt: string;
};