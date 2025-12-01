// components/UserReviewDrawer.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; 
import { UserCandidate } from '@/interfaces/usercandidates';


interface UserReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserCandidate | null;
  onApprove: (user: UserCandidate) => void;
  onReject: (user: UserCandidate) => void;
}

const DataRow = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 py-3 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 font-medium text-sm md:col-span-1">{label}</span>
    <span className="text-gray-800 text-sm md:col-span-2 break-words">{value || 'N/A'}</span>
  </div>
);

export const UserReviewDrawer = ({ isOpen, onClose, user, onApprove, onReject }: UserReviewDrawerProps) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 uppercase">
            USUARIO: {user.name}
          </h2>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              variant="primary" color="danger"
              onClick={() => onReject(user)} 
            >
              Rechazar
            </Button>
            <Button 
              variant="primary" color='sucess' 
              //className="bg-green-500 hover:bg-green-600 text-white " 
            >
              Aprobar
            </Button>
          </div>
        </div>

        {/* Content - Lista de datos */}
        <div className="p-6 space-y-1">
           <div className="grid grid-cols-1 md:grid-cols-3 pb-2 mb-2 border-b font-bold text-gray-700">
              <span className="md:col-span-1">Campo</span>
              <span className="md:col-span-2">Valor</span>
           </div>
           
           <DataRow label="Fecha de nacimiento" value={user.birthDate} />
           <DataRow label="Correo electrónico" value={user.email} />
           <DataRow label="Dirección" value={user.address} />
           <DataRow label="Teléfono celular" value={user.phone} />
           <DataRow label="Grado de estudios" value={user.educationLevel} />
           <DataRow label="Carrera (opcional)" value={user.career} />
           <DataRow label="Experiencia" value={user.experience} />
           <DataRow label="Posición deseada" value={user.desiredPosition} />
           <DataRow label="Fecha de registro" value={user.registrationDate} />
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button 
            onClick={onClose}
            className="text-red-500 font-medium hover:underline text-sm"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};