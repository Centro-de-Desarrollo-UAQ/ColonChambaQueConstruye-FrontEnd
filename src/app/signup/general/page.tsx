'use client'

import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import LinkerNavBar from "@/components/linker/LinkerNavBar";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, SignupFormType } from "@/validations/signupSchema";

export default function PublicSignup() {
  const methods = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: SignupFormType) => console.log(data);

  return (
    <div className="min-h-screen flex flex-col">
      <LinkerNavBar />

      {/* Contenido principal */}
       <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
            <div className="w-full max-w-2xl border border-gray-300 space-y-8 rounded-md shadow-sm p-12">
                <div className="flex flex-col items-center space-y-2">
                    <h1 className="text-3xl font-bold">Encuentra el empleo perfecto para ti.</h1>
                    <span className="text-sm">Regístrate y accede a las ofertas de trabajo ofrecidas para la comunidad UAQ</span>
                </div>
                <div className="flex justify-end">
                    <Link
                        href="#"
                        className="font-medium text-[color:var(--color-uaq-brand)]"
                    >
                        Soy estudiante o egresado UAQ
                    </Link>
                </div>
                    
          {/* Formulario */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <FormInput
                control={control}
                name="name"
                label="Nombre(s)"
                type="text"
                maxChars={100}
              />

              <FormInput
                control={control}
                name="lastname"
                label="Apellido(s)"
                type="text"
                maxChars={100}
              />

              <FormInput
                control={control}
                name="email"
                label="Correo electrónico"
                type="email"
                maxChars={244}
              />

              {/* Contraseña  */}
              <div className="flex gap-6">
                <div className="w-1/2">
                  <FormInput
                    control={control}
                    name="password"
                    label="Contraseña"
                    type="password"
                    maxChars={50}
                  />
                </div>

                <div className="w-1/2">
                  <FormInput
                    control={control}
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    maxChars={50}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm flex items-center gap-1">
                  ¿Ya tienes cuenta?
                  <Link href="#" className="font-medium underline">
                    Inicia Sesión
                  </Link>
                </p>

                <Button variant="primary" color="brand" type="submit">
                  Regístrate ahora
                </Button>
              </div>
            </form>
          </FormProvider>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <p>¿Eres una empresa?</p>
            <Link
              href="#"
              className="font-medium underline text-[color:var(--color-uaq-brand)]"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm border-t border-gray-300 bg-uaq-default-100 py-6">
        <span>Centro de Desarrollo © 2025</span>
      </footer>
    </div>
  );
}
