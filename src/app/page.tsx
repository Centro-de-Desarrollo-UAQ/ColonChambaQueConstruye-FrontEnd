'use client'
import React, { useState } from "react";
import { useRef } from "react"
import { Button } from "@/components/ui/button";
import { ButtonNavBar } from "@/components/ui/buttonNavBar";
import { Badge } from "@/components/ui/badge";
import LinkerNavBar from "@/components/linkerNavBar";
import UserNavBar from "@/components/userNavBar";
import FooterLanding from "@/components/footerLanding";
import { Eye } from "@solar-icons/react";
import InputSelect from "@/components/inputSelect";
import InputBirthDate from "@/components/inputBirthDate";
import { FormField } from "@/components/input";



export default function Home() {
  const [visibleBadges, setVisibleBadges] = useState({
    outlineClosable: true,
    defaultClosable: true,
    secondaryClosable: true,
    destructiveClosable: true,
  })
  const inputRef = useRef<HTMLInputElement>(null)


  const handleClose = (badge: string) => {
    setVisibleBadges((prevState) => ({
      ...prevState,
      [badge]: false,
    }))
  }
  return (
    <>
    <div>
      <LinkerNavBar />
      <div className="bg-white p-2"></div>
      <UserNavBar/>
    </div>
      <div className="space-y-4">
        <h1 className="px-">My Homepage</h1>
        <p>Welcome!</p>
        <Button variant="default">Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="edit">Button</Button>
      </div>
      <div className="space-y-4">
        <ButtonNavBar variant="hover" size="sm">Option</ButtonNavBar>
        <ButtonNavBar variant="default" size="default">Option</ButtonNavBar>
        <ButtonNavBar variant="active">Option</ButtonNavBar>
      </div>

      <div className="space-y-4">
      {/* Badges sin onClose */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Abierto</Badge>
        <Badge variant="secondary">Cerrado</Badge>
        <Badge variant="destructive">En Revisión</Badge>
        <Badge variant="outline">Ingeniería en Software</Badge>
      </div>

      {/* Badges con onClose */}
      <div className="flex flex-wrap gap-2">
        {visibleBadges.outlineClosable && (
          <Badge variant="outline" onClose={() => handleClose("outlineClosable")}>
            Ingeniería en Software
          </Badge>
        )}

        {visibleBadges.defaultClosable && (
          <Badge variant="defaultClosable" onClose={() => handleClose("defaultClosable")}>
            Default Badge with Close
          </Badge>
        )}

        {visibleBadges.secondaryClosable && (
          <Badge variant="secondaryClosable" onClose={() => handleClose("secondaryClosable")}>
            Secondary Badge with Close
          </Badge>
        )}

        {visibleBadges.destructiveClosable && (
          <Badge variant="destructiveClosable" onClose={() => handleClose("destructiveClosable")}>
            Destructive Badge with Close
          </Badge>
        )}
      </div>
      
      <div>
        <div className="grid w-full max-w-sm items-center gap-2">
            {/* Campo con contador */}
      <FormField
        label="Nombre"
        description="Ingresa tu nombre completo"
        htmlFor="nombre"
        type="text"
        inputRef={inputRef}
        maxChars={50}
        placeholder="Escribe aquí..."
        variant="count"
      />

      {/* Textarea */}
      <FormField
        label="Textarea"
        description="Escribe tu mensaje aquí"
        type="textarea"
        placeholder="Type your message here."
      />

      {/* Campo de email */}
      <FormField
        label="Email"
        description="Ingresa tu dirección de correo"
        type="email"
        htmlFor="email"
        placeholder="ejemplo@email.com"
      />

      {/* Combobox */}
      <FormField
        label="País"
        description="Selecciona tu país de residencia"
        type="combobox"
        width={380}
      />

      {/* Campo deshabilitado */}
      <FormField
        label="Campo deshabilitado"
        description="Este campo está desactivado"
        type="text"
        disabled
        placeholder="No puedes editar esto"
      />

      {/* Campo de contraseña */}
      <FormField
        label="Contraseña"
        description="Mínimo 8 caracteres"
        type="password"
        placeholder="Ingresa tu contraseña"
        icon={Eye}
        iconPosition="right"
        descriptionClassName="mb-8" 
      />
          {/* <Label htmlFor="nombre" variant="count" inputRef={inputRef} maxChars={50}>
            Nombre
          </Label>
          <Input type="text" id="nombre" ref={inputRef} maxLength={50} placeholder="Escribe aquí..." />
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label>

          <Label htmlFor="email">Textarea</Label>
          <Textarea placeholder="Type your message here." />
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label>

          <Label htmlFor="email">Input</Label>
          <Input type="email" id="email" placeholder="Email" />
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label>

          <Label htmlFor="email">ComboBox</Label>
          <ComboboxDemo width={380}/>
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label>

          <Label htmlFor="email">Disabled Input</Label>
          <Input disabled type="text" placeholder="Content" />
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label>

          <Label htmlFor="email">Password Input</Label>
          <Input type="password" placeholder="Password" icon={Eye} iconPosition="right" />
          <Label htmlFor="description" variant="description" className="mb-6">Description</Label> */}

        </div>
      </div>
    </div>
    <div className="mt-10 w-1/2">
    <InputSelect/>
    </div>
    <div className="mt-10 w-1/2">
    <InputBirthDate/>

    </div>
    <div className="mt-10">
      <FooterLanding/>
    </div>
    </>
  );
}
