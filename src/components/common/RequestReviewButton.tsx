'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/Alerts';
import ConfirmRequestReviewModal from '@/components/ui/modal/ConfirmRequestModal'; 

interface RequestReviewButtonProps {
  endpoint: string;
  token: string;
  onSuccess: () => void;
  buttonText?: string;
}

export default function RequestReviewButton({
  endpoint,
  token,
  onSuccess,
  buttonText = 'Solicitar nueva revisión'
}: RequestReviewButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const [alertConfig, setAlertConfig] = useState<{
    isVisible: boolean;
    type: 'error' | 'warning';
    title: string;
    description: string;
  }>({ isVisible: false, type: 'error', title: '', description: '' });

  const handleRequestReview = async () => {
    setIsModalOpen(false); 
    try {
      setIsSubmitting(true);
      setAlertConfig(prev => ({ ...prev, isVisible: false }));

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        onSuccess();
        return;
      }

      setAlertConfig({
        isVisible: true,
        type: 'error',
        title: 'Error',
        description: 'No se pudo enviar la solicitud. Intenta más tarde.'
      });

    } catch (error) {
      console.error('Error al solicitar revisión:', error);
      setAlertConfig({
        isVisible: true,
        type: 'error',
        title: 'Error de conexión',
        description: 'Hubo un problema al comunicarse con el servidor.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Alert 
        isVisible={alertConfig.isVisible}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
        type={alertConfig.type}
        title={alertConfig.title}
        description={alertConfig.description}
      />
      
      <Button 
        variant="secondary" 
        className="w-full py-6 text-md font-semibold hover:bg-gray-300"
        onClick={() => setIsModalOpen(true)} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando solicitud...' : buttonText}
      </Button>

      <ConfirmRequestReviewModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRequestReview}
      />
    </>
  );
}