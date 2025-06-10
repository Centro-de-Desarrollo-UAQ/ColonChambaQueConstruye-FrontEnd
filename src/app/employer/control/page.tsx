'use client'
import { ConfigRow } from "@/components/settings/ConfigRow";
import { InfoCard } from "@/components/settings/InfoCard";
import TabOptions from "@/components/common/TabOptions";
import TitleSection from "@/components/common/TitleSection";
import { UserCircle, Buildings } from "@solar-icons/react";

export default function ProfileEmployer() {
    const sectionConfig = {
        employerControl: {
          icon: <UserCircle size={24} weight="Bold" />,
          title: 'CUENTA Y ACCESO',
          description: 'Revise y modifique la información del empleador y de acceso a la cuenta'
        }
    };

    const tabsConfig = [
        {
          value: 'employerProfile',
          route: '/employer/profile',
          icon: <Buildings size={24} weight="Bold" />,
          label: 'Información empresarial'
        },
        {
          value: 'employerControl',
          route: '/employer/control',
          icon: <UserCircle size={24} weight="Bold" />,
          label: 'Cuenta y acceso'
        }
    ];

    return (
        <div className="flex w-full flex-col gap-1 md:flex-row py-10">
            {/* Columna izquierda - Perfil y tabs */}
            <div className="mx-auto max-w-md bg-white">
                <InfoCard
                    avatar="https://github.com/shadcn.png"
                    name="Deloitte QRO"
                    email="contacto_qro@deloitte.com"
                    cellphone="+52 441 441 22 22"
                />
            
                <div className="w-full px-4 pb-8">
                    <TabOptions 
                      tabs={tabsConfig} 
                      defaultTab="employerProfile" 
                    />
                </div>
            </div>

            {/* Columna derecha - Contenido principal */}
            <div className="mr-20 flex-1 space-y-6 p-4 md:p-6">
                {/* Encabezado */}
                <TitleSection 
                    sections={sectionConfig} 
                    currentSection="employerControl" 
                />        
                
                {/* Sección de Información */}
                <div className="border-uaq-default-300 rounded-lg border shadow-sm">
                    <ConfigRow
                        title="Información personal"
                        valueinput=""
                        isTitle={true}
                        placeholder=""
                        isEditable={true}
                        editInput={true}
                    />
            
                    {/* Fila 1 - Expediente */}
                    <div className="px-6">
                        <ConfigRow
                            title="Nombre del empleador"
                            valueinput="Pedro Sola Martínez Pérez"
                            isTitle={false}
                            placeholder="Contenido"
                            isEditable={false}
                            editInput={false}
                        />
                    </div>
                    
                    {/* Fila 2 - Nombre */}
                    <div className="px-6">
                        <ConfigRow
                            title="Número de teléfono"
                            valueinput="+52 441 032 32 08"
                            isTitle={false}
                            placeholder="Contenido"
                            isEditable={false}
                            editInput={false}
                        />
                    </div>
                    
                    <div>
                        <ConfigRow
                        title="Acceso"
                        valueinput=""
                        isTitle={true}
                        placeholder=""
                        isEditable={false}
                        editInput={true}
                    />
                    </div>
                    
                    {/* Fila 4 - Fecha */}
                    <div className="px-6">
                        <ConfigRow
                            title="Correo electrónico del empleador"
                            valueinput="pedrito_picapiedra_74@deloitte.com"
                            isTitle={false}
                            placeholder="Contenido"
                            isEditable={true}
                            editInput={false}
                        />
                        <ConfigRow
                            title="Contraseña"
                            valueinput="********"
                            isTitle={false}
                            placeholder="Contenido"
                            isEditable={true}
                            editInput={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}