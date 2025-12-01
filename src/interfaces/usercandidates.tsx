export interface UserCandidate {
  id: string | number;
  name: string;
  birthDate: string;
  email: string;
  address: string;
  phone: string;
  educationLevel: string;
  career?: string; // Opcional
  experience: string;
  desiredPosition: string;
  registrationDate: string;
}