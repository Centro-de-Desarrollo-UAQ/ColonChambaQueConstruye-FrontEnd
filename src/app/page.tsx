"use client";
import React, { useState } from "react";
import { useRef } from "react"
import { Button } from "@/components/ui/button";
import { ButtonNavBar } from "@/components/ui/buttonNavBar";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import LinkerNavBar from "@/components/linkerNavBar";
import UserNavBar from "@/components/userNavBar";
import FooterLanding from "@/components/footerLanding";
import { Eye } from "@solar-icons/react";
import InputSelect from "@/components/inputSelect";
import InputBirthDate from "@/components/inputBirthDate";
import { FormField } from "@/components/input";


=======
import { InfoCard } from "@/components/InfoCard/InfoCard";
import { ConfigRow } from "@/components/ConfigRow/ConfigRow";
>>>>>>> e94c81be2d5cfe41bc75f105f0160dd4fe23e916

export default function Home() {
  const [visibleBadges, setVisibleBadges] = useState({
    outlineClosable: true,
    defaultClosable: true,
    secondaryClosable: true,
    destructiveClosable: true,
<<<<<<< HEAD
  })
  const inputRef = useRef<HTMLInputElement>(null)

=======
  });
>>>>>>> e94c81be2d5cfe41bc75f105f0160dd4fe23e916

  const handleClose = (badge: string) => {
    setVisibleBadges((prevState) => ({
      ...prevState,
      [badge]: false,
    }));
  };
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
            <Badge
              variant="outline"
              onClose={() => handleClose("outlineClosable")}
            >
              Ingeniería en Software
            </Badge>
          )}

          {visibleBadges.defaultClosable && (
            <Badge
              variant="defaultClosable"
              onClose={() => handleClose("defaultClosable")}
            >
              Default Badge with Close
            </Badge>
          )}

          {visibleBadges.secondaryClosable && (
            <Badge
              variant="secondaryClosable"
              onClose={() => handleClose("secondaryClosable")}
            >
              Secondary Badge with Close
            </Badge>
          )}

          {visibleBadges.destructiveClosable && (
            <Badge
              variant="destructiveClosable"
              onClose={() => handleClose("destructiveClosable")}
            >
              Destructive Badge with Close
            </Badge>
          )}
        </div>
      </div>
       {/* InfoCard */}
      <div className="flex">
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone="+52 441 441 22 22"/>
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone={null}/>
      </div>

      {/* ConfigRow */}
      <div className="flex space-y-4 flex-col w-[60vw]">
        <ConfigRow title="Header Title" valueinput="" isTitle={true} placeholder=""  isEditable={true} editInput={true}/>
        <ConfigRow title="Header Title" valueinput="" isTitle={true} placeholder=""  isEditable={false} editInput={true}/>
        <ConfigRow title="Header Title" valueinput="Hola" isTitle={false} placeholder="Contenido"  isEditable={false} editInput={false}/>
        <ConfigRow title="Header Title" valueinput="Hola" isTitle={false} placeholder="Contenido"  isEditable={true} editInput={true}/>
        <ConfigRow title="Header Title" valueinput="" isTitle={false} placeholder="Password"  isEditable={false} editInput={true}/>
        <ConfigRow title="Header Title" valueinput="" isTitle={false} placeholder="Password"  isEditable={true} editInput={true}/>

      </div>
<<<<<<< HEAD
      
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
=======
>>>>>>> e94c81be2d5cfe41bc75f105f0160dd4fe23e916
    </>
  );
}
 