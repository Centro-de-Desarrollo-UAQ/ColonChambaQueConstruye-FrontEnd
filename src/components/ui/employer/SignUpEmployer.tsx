'use client';

import { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Textarea } from '../textArea';
import Link from 'next/link';
import ImageUploadStep from './ImageUploadSignUp';
import EmployerDetailsStep from './EmployerDetailsStep';
import { useRef } from 'react';

export default function SignUpEmployer() {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const formRef = useRef<HTMLDivElement | null>(null);
    interface FormDataType {
        companyName: string;
        companyEmail: string;
        companyDescription: string;
        companyAddressStreet: string;
        companyAddressState: string;
        companyAddressZip: string;
        companyAddressCountry: string;
        companyRFC: string;
        companyRazonSocial: string;
        companySector: string;
        employerName: string;
        employerLastName: string;
        employerEmail: string;
        employerPhone: string;
        employerPhoneCode: string;
        accountPassword: string;
        accountPasswordConfirm: string;
        accountTerms: boolean;
        image: string | null;
    }
    const [formData, setFormData] = useState<FormDataType>({
        companyName: '',
        companyEmail: '',
        companyDescription: '',
        companyAddressStreet: '',
        companyAddressState: 'Selecciona un estado',
        companyAddressZip: '',
        companyAddressCountry: 'Selecciona un Pais',
        companyRFC: '',
        companyRazonSocial: '',
        companySector: 'Selecciona un sector',
        employerName: '',
        employerLastName: '',
        employerEmail: '',
        employerPhone: '',
        employerPhoneCode: 'MX +(52)',
        accountPassword: '',
        accountPasswordConfirm: '',
        accountTerms: false,
        image: null,
    });

    const requiredFields = [
        "companyName",
        "companyEmail",
        "companyDescription",
        "companyAddressStreet",
        "companyAddressState",
        "companyAddressZip",
        "companyAddressCountry",
        "companyPhone",
        "companyRFC",
        "companyRazonSocial",
        "employerName",
        "employerLastName",
        "employerEmail",
        "employerPhone",
        "accountPassword",
        "accountPasswordConfirm",
        "accountTerms",
    ];


    // TODO: Validate email format, password strength and selects values
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var fieldsRequiredMessage = false
    
        requiredFields.forEach((field) => {
            const value = formData[field as keyof FormDataType];
    
            if (field === "accountPassword" && formData.accountPassword !== formData.accountPasswordConfirm) {
                newErrors["accountPasswordConfirm"] = "Las contraseñas no coinciden.";
                return;
            }
    
            if (field === "employerEmail" && !emailRegex.test(formData.employerEmail)) {
                newErrors["employerEmail"] = "El formato del correo electrónico del empleador no es válido.";
                return;
            }
    
            if (field === "companyEmail" && !emailRegex.test(formData.companyEmail)) {
                newErrors["companyEmail"] = "El formato del correo electrónico de la compañía no es válido.";
                return;
            }
    
            if (field === "accountTerms" && !formData.accountTerms) {
                newErrors[field] = "Debes aceptar las condiciones legales para continuar.";
                return;
            }
    
            if (typeof value === "string" && !value.trim() && !newErrors[field] && !fieldsRequiredMessage) {
                fieldsRequiredMessage = true
                newErrors[field] = "Hay campos obligatorios sin completar.";
            }
        });
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    
        return Object.keys(newErrors).length === 0;
    };

    const handleFormDataChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };


    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <div ref={formRef} className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-zinc-50 p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Únete como empleador</h2>
                <p className="text-center mb-6 leading-5">
                    Conecta con el talento que tu empresa necesita.
                    Publica ofertas de trabajo y encuentra a los profesionales ideales para tu equipo.
                </p>
                <div className="flex justify-center mb-8">
                    <div className="flex items-center w-full">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full 
                    ${step === 1 ? 'bg-uaq-brand text-white' : 'bg-uaq-brand text-white'}`}>
                            1
                        </div>
                        <div className={`w-[90%] h-[2px] bg-gray-300 rounded 
                            ${step === 2 ? 'bg-uaq-brand text-white' : 'bg-gray-300 rounded'}`}></div>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full 
                    ${step === 2 ? 'bg-uaq-brand text-white' : 'bg-zinc-200 text-uaq-brand'}`}>
                            2
                        </div>
                    </div>
                </div>
                {errors && Object.keys(errors).length > 0 && (
                    <div className="text-uaq-danger text-sm mb-4 border border-uaq-danger rounded p-4">
                        <p className="font-bold">Por favor, revisa los siguientes errores:<br/></p> 
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}

                {step === 1 && (
                    <>
                        <EmployerDetailsStep formData={formData} onFormDataChange={handleFormDataChange}/>
                        <div>
                            <label className="flex items-center justify-center gap-2 mt-4">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    name="accountTerms"
                                    checked={formData.accountTerms}
                                    onChange={(e) => setFormData({ ...formData, accountTerms: e.target.checked })}
                                />
                                {/* TODO: Add link to terms and conditions */}
                                <div>
                                    He leído las <Link href="" className='text-uaq-brand underline'>Condiciones Legales</Link> y
                                    la <Link href="" className='text-uaq-brand underline'>Política de Privacidad</Link> de la Bolsa de Trabajo UAQ
                                    para continuar con el registro.
                                </div>
                            </label>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <ImageUploadStep
                    selectedImage={formData.image}
                    setSelectedImage={(image) => setFormData({ ...formData, image })}
                  />
                )}

                <div className="flex justify-between items-center mt-8 w-full">
                    {step === 1 && (
                        <>
                            {/* TODO: Add link to login page */}
                            <label className="flex items-center gap-1 text-zinc-600">
                                ¿Ya tienes una cuenta?
                                <Link href="" className="font-bold underline cursor-pointer">
                                    Inicia sesión
                                </Link>
                            </label>
                            <Button
                                variant="default"
                                onClick={() => {
                                    if (validateFields()) {
                                        handleNext();
                                    }
                                }}
                            >
                                Siguiente
                            </Button>
                        </>
                    )}

                    {step > 1 && (
                        <Button variant="ghost" onClick={handleBack}>
                            Atrás
                        </Button>
                    )}

                    {step === 2 && (
                        <Button variant="default" onClick={handleSubmit}>
                            Crear cuenta
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
