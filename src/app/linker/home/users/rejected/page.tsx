'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FileRemove, InboxIn } from '@solar-icons/react';
import { toast } from 'sonner';

import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import TitleSection from '@/components/common/TitleSection';
import UserLinkerCard from '@/components/linker/UserLinkerCard';
import { UserSearchFilters } from '@/components/linker/CompanySearchEmploy';
import PaginationControl from '@/components/navigation/paginationControl';

import { UserCandidate } from '@/interfaces/usercandidates';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { apiService } from '@/services/api.service';

export const workShiftLabelMap: Record<string, string> = {
  TIEMPO_COMPLETO: "Tiempo completo",
  MEDIO_TIEMPO: "Medio tiempo",
  HORARIO_FLEXIBLE: "Horario flexible",
  PAGO_HORA: "Pago por hora",
  PRACTICAS: "Prácticas",
};

interface UserApiResponse {
  statusCode: number;
  message: string;
  data: {
    User: UserCandidate[];
  }[];
}

export default function CompaniesRejectedPage() {
  const { token, id: linkerId } = useApplicantStore();

  const [users, setUsers] = useState<UserCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const sectionConfig = {
    talents: {
      title: 'SOLICITUDES RECHAZADAS DE BUSCADORES DE EMPLEO',
      icon: <InboxIn className="w-6 h-6" weight="Bold" />,
      description: 'Consulta los perfiles que han sido rechazados.',
    },
  };

  const fetchRejectedUsers = useCallback(async () => {
    if (!token || !linkerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      
      const query = new URLSearchParams({
        status: 'RECHAZADO', 
        limit: pageSize.toString(),
        offset: offset.toString(),
      });

      const response = await apiService.get(`/linkers/${linkerId}/users?${query.toString()}`);

      if (response.ok) {
        const result: UserApiResponse = await response.json();
        const cleanData = result.data.flatMap((item) => item.User);
        
        const calculatedTotal = offset + cleanData.length + (cleanData.length === pageSize ? 1 : 0);

        setUsers(cleanData);
        setTotalItems(calculatedTotal);
      } else {
        toast.error("Error al obtener las solicitudes rechazadas");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error de conexión al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  }, [linkerId, currentPage, token, pageSize]);

  useEffect(() => {
    fetchRejectedUsers();
  }, [fetchRejectedUsers]);

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-5 p-10 font-sans">
      <TitleSection sections={sectionConfig} currentSection={'talents'} />

      <div className={`transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <UniversalCardsFilter
          items={users}
          filters={UserSearchFilters}
          accessors={{
            name: (u: UserCandidate) => `${u.firstName || ''} ${u.lastName || ''} ${u.desiredPosition || ''}`,
            academicLevel: (u: UserCandidate) => u.academicLevel || '',
            registeredAt: (u: UserCandidate) => u.registeredAt || '',
          }}
          render={(filtered: UserCandidate[]) => (
            <div className="space-y-4">
              
              {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-gray-400 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <FileRemove className="w-16 h-16 text-gray-300" />
                  <div>
                    <h2 className="font-bold text-lg text-gray-500">NO SE ENCONTRARON RESULTADOS</h2>
                    <p className="text-sm font-normal mt-1">
                      Intenta con otras palabras clave o no hay perfiles rechazados aún.
                    </p>
                  </div>
                </div>
              )}
              
              {filtered.map((user) => (
                <UserLinkerCard key={user.id} user={user} />
              ))}

              {users.length > 0 && (
                <div className="border-t border-gray-200 pt-2 mt-6">
                  <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={(page: number) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onPageSizeChange={(size: number) => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                  />
                </div>
              )}
            </div>
          )}
          multiMode='OR'
        />
      </div>
      
      {loading && users.length === 0 && (
        <div className="flex h-64 items-center justify-center -mt-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      )}
    </div>
  );
}