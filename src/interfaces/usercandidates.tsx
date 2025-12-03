export interface UserCandidate {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  phone: string;
  educationLevel: string;
  career?: string; // Opcional
  experience: string;
  desiredPosition: string;
  registrationDate: string;
  status: 'REVISION' | 'RECHAZADO' | 'ACTIVO' | 'INACTIVO';
}