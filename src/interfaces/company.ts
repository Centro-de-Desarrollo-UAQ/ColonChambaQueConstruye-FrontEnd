export type Company = {
  id: string;
  name: string;
  representative: string;
  emailContact: string;
  phoneContact: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
};
