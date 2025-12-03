'use client';

import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';
import Headersimple from '@/components/ui/header-simple';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCompanyStore } from '@/app/store/authCompanyStore';




export default function PublicLogin() {

  const router = useRouter();
  const { login } = useCompanyStore();

  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await authService.loginAccount(data.email, data.password, 'company');
      
      const accountData = response.data;
      
      if (!accountData) {
        throw new Error('La respuesta del servidor está vacía.');
      }

   
      const companyId = accountData.Company?.id; 

      const accountStatus = accountData.status;
      const companyStatus = accountData.Company?.status;

      console.log("ACCOUNT ID:", accountData.id);
      console.log("COMPANY ID:", companyId);

      //  Mostrar el ID del usuario en consola para uso futuro
      console.log("COMPANY ID:", companyId);

      // Lógica de redirección y guardado condicional
      const isAccountActive = accountStatus === 'ACTIVA';
      const isCompanyActive = companyStatus === 'ACTIVA';

      if (isAccountActive && isCompanyActive) {
        
        // Verificamos que existan las credenciales antes de guardar
        if (accountData.token && companyId) {
            // Guardamos token e ID en el store 
            login({
                token: accountData.token,
                companyId,
                email: accountData.email,
                status: accountStatus,
            });

            toast.success('Inicio de sesión exitoso');
            router.push('/employer/home/vacancies');
        } else {
            throw new Error('Error: Faltan el token o el ID en la respuesta del servidor.');
        }

      } else {
        // CASO: USUARIO NO ACTIVO (Pendiente, Rechazada, etc.)
        // NO guardamos el token ni el ID en el store.
      
        console.warn('Cuenta inactiva o pendiente. No se guardó la sesión.');
        
        // Opcional: Mostrar un mensaje informativo antes de redirigir
        if (accountStatus === 'PENDIENTE' || companyStatus === 'PENDIENTE') {
            toast.info('Tu cuenta está pendiente de aprobación.');
        } else {
            toast.warning('Tu cuenta no se encuentra activa.');
        }

        router.push('/login/waiting');
      }

    } catch (error: any) {
      console.error('Error en login:', error.message);
      toast.error(error.message || 'Error al iniciar sesión');
    }
  };


  return (
    <>
      <Headersimple />
      <div
        className="flex min-h-screen flex-col items-center justify-center py-15"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex h-fit flex-col items-center justify-center gap-10">


          <div className="h-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white p-12 gap-8 w-[696px] shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-normal leading-none tracking-normal text-center text-[#FF7F40]">
                Ingresar como reclutador de talentos
              </h1>

            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="space-y-10">
                  <div>
                    
                    <FormInput
                      control={control}
                      name="email"
                      label="Correo "
                      type="email"
                      maxChars={244}
                    />

                  </div>


                  <div>
                    <FormInput
                      control={control}
                      name="password"
                      label="Contraseña "
                      type="password"
                      maxChars={50}
                    />
                  </div>

                </div>

                <div >
                    <Link
                    href={"recovery"}
                    className="block text-right font-medium no-underline hover:no-underline focus:no-underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1 text-sm font-bold">
                    ¿No tienes cuenta?
                    <Link href="/signup/employer" className="font-bold no-underline text-[#FF7F40]"
                    >
                      Regístrate
                    </Link>
                  </p>
                    <Button variant="primary" 
                            color="brand" 
                            type="submit"
                            >
                      Iniciar sesión
                    </Button>
                </div>
              </form>
            </FormProvider>

            <div className="space-y-2 text-center text-sm text-gray-600">
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
