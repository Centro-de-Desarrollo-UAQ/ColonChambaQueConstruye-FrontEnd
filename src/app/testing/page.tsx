"use client";
import React, { useState } from "react";
import { useRef } from "react"
import { Button } from "@/components/ui/button";
import { ButtonNavBar } from "@/components/ui/buttonNavBar";
import { Badge } from "@/components/ui/badge";
import LinkerNavBar from "@/components/linkerNavBar";
import UserNavBar from "@/components/userNavBar";
import FooterLanding from "@/components/footerLanding";
import DropdownSelect from "@/components/ui/dropdownselect";
import Toggle from '@/components/ui/toggle';
import SimpleSelect from "@/components/ui/simpleselect";
import { Eye, AddCircle } from "@solar-icons/react";
import InputSelect from "@/components/inputSelect";
import InputBirthDate from "@/components/inputBirthDate";
import { FormField } from "@/components/input";
import { InfoCard } from "@/components/InfoCard/InfoCard";
import { ConfigRow } from "@/components/ConfigRow/ConfigRow";
import CompanyCard from "@/components/companyCard";
import StepperRegister from "@/components/stepperRegister";
import LinkerHeader from "@/components/linkerHeader";
import QuestionItem from "@/components/questionItem";
import { Search } from "lucide-react";
import SearchBar from "@/components/ui/searchbar";

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
    }));
  };
  return (
    <>
    <div>
      <LinkerNavBar />
      <div className="bg-white p-2"></div>
      <UserNavBar/>
      <div className="bg-black p-2"></div>
      <LinkerHeader isCompany={true}/>
      <div className="bg-white p-2"></div>
      <QuestionItem
        question="Pregunta" 
        description="Descripción"
      />
    </div>
      <div className="space-y-4">

      <StepperRegister/>

      <CompanyCard
        title="Deloitte"
        description="Consultoría y servicios profesionales"
        email="contacto@deloitte.com"
        activeVacancies={8}
        logoUrl="/Deloitte.svg"
      />        
        
        <h1 className="px-">My Homepage</h1>
        <p>Welcome!</p>

        <div className="my-8 flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Button Variants</h2>
          <p>Primary:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="primary" color="brand">Primary</Button>
              <Button variant="primary" color="accent">Primary</Button>
              <Button variant="primary" color="danger">Primary</Button>
              <Button variant="primary" color="gray">Primary</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" color="brand">
                <AddCircle weight="Bold" />
                Primary
              </Button>
              <Button variant="primary" color="accent">
                <AddCircle weight="Bold" />
                Primary
              </Button>
              <Button variant="primary" color="danger">
                <AddCircle weight="Bold" />
                Primary
              </Button>
              <Button variant="primary" color="gray">
                <AddCircle weight="Bold" />
                Primary
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" color="brand">
                Primary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="accent">
                Primary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="danger">
                Primary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="gray">
                Primary
                <AddCircle weight="Bold" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" color="brand" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="accent" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="danger" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="primary" color="gray" size="icon">
                <AddCircle weight="Bold" />
              </Button>
            </div>
          </div>
          <p>Secondary:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="secondary" color="brand">Secondary</Button>
              <Button variant="secondary" color="accent">Secondary</Button>
              <Button variant="secondary" color="danger">Secondary</Button>
              <Button variant="secondary" color="gray">Secondary</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" color="brand">
                <AddCircle weight="Bold" />
                Secondary
              </Button>
              <Button variant="secondary" color="accent">
                <AddCircle weight="Bold" />
                Secondary
              </Button>
              <Button variant="secondary" color="danger">
                <AddCircle weight="Bold" />
                Secondary
              </Button>
              <Button variant="secondary" color="gray">
                <AddCircle weight="Bold" />
                Secondary
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" color="brand">
                Secondary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="accent">
                Secondary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="danger">
                Secondary
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="gray">
                Secondary
                <AddCircle weight="Bold" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" color="brand" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="accent" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="danger" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="secondary" color="gray" size="icon">
                <AddCircle weight="Bold" />
              </Button>
            </div>
          </div>
          <p>Edit:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="edit" color="brand">Edit</Button>
              <Button variant="edit" color="accent">Edit</Button>
              <Button variant="edit" color="danger">Edit</Button>
              <Button variant="edit" color="gray">Edit</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="edit" color="brand">
                <AddCircle weight="Bold" />
                Edit
              </Button>
              <Button variant="edit" color="accent">
                <AddCircle weight="Bold" />
                Edit
              </Button>
              <Button variant="edit" color="danger">
                <AddCircle weight="Bold" />
                Edit
              </Button>
              <Button variant="edit" color="gray">
                <AddCircle weight="Bold" />
                Edit
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="edit" color="brand">
                Edit
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="accent">
                Edit
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="danger">
                Edit
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="gray">
                Edit
                <AddCircle weight="Bold" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="edit" color="brand" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="accent" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="danger" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="edit" color="gray" size="icon">
                <AddCircle weight="Bold" />
              </Button>
            </div>
          </div>
          <p>Ghost:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="ghost" color="brand">Ghost</Button>
              <Button variant="ghost" color="accent">Ghost</Button>
              <Button variant="ghost" color="danger">Ghost</Button>
              <Button variant="ghost" color="gray">Ghost</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" color="brand">
                <AddCircle weight="Bold" />
                Ghost
              </Button>
              <Button variant="ghost" color="accent">
                <AddCircle weight="Bold" />
                Ghost
              </Button>
              <Button variant="ghost" color="danger">
                <AddCircle weight="Bold" />
                Ghost
              </Button>
              <Button variant="ghost" color="gray">
                <AddCircle weight="Bold" />
                Ghost
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" color="brand">
                Ghost
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="accent">
                Ghost
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="danger">
                Ghost
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="gray">
                Ghost
                <AddCircle weight="Bold" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" color="brand" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="accent" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="danger" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="ghost" color="gray" size="icon">
                <AddCircle weight="Bold" />
              </Button>
            </div>
          </div>
          <p>Mono:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="mono" color="brand">Mono</Button>
              <Button variant="mono" color="accent">Mono</Button>
              <Button variant="mono" color="danger">Mono</Button>
              <Button variant="mono" color="gray">Mono</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="mono" color="brand">
                <AddCircle weight="Bold" />
                Mono
              </Button>
              <Button variant="mono" color="accent">
                <AddCircle weight="Bold" />
                Mono
              </Button>
              <Button variant="mono" color="danger">
                <AddCircle weight="Bold" />
                Mono
              </Button>
              <Button variant="mono" color="gray">
                <AddCircle weight="Bold" />
                Mono
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="mono" color="brand">
                Mono
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="accent">
                Mono
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="danger">
                Mono
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="gray">
                Mono
                <AddCircle weight="Bold" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="mono" color="brand" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="accent" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="danger" size="icon">
                <AddCircle weight="Bold" />
              </Button>
              <Button variant="mono" color="gray" size="icon">
                <AddCircle weight="Bold" />
              </Button>
            </div>
          </div>
        </div>
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
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone="+52 441 441 22 22" />
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone={null} />
      </div>

      {/* ConfigRow */}
      <div className="flex space-y-4 flex-col w-[60vw]">
        <ConfigRow title="Header Title" valueinput="" isTitle={true} placeholder="" isEditable={true} editInput={true} />
        <ConfigRow title="Header Title" valueinput="" isTitle={true} placeholder="" isEditable={false} editInput={true} />
        <ConfigRow title="Header Title" valueinput="Hola" isTitle={false} placeholder="Contenido" isEditable={false} editInput={false} />
        <ConfigRow title="Header Title" valueinput="Hola" isTitle={false} placeholder="Contenido" isEditable={true} editInput={true} />
        <ConfigRow title="Header Title" valueinput="" isTitle={false} placeholder="Password" isEditable={false} editInput={true} />
        <ConfigRow title="Header Title" valueinput="" isTitle={false} placeholder="Password" isEditable={true} editInput={true} />

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
      <div className="my-10">
        <h2 className="text-xl font-semibold mb-4">Dropdown Select Aspect</h2>
        <DropdownSelect color="gray" />
        <DropdownSelect color="blue" />
      </div>

      <div className="my-10">
        <h2 className="text-xl font-semibold mb-4">Toggle Aspect</h2>
        <Toggle  />
      </div>

      <div className="my-10">
        <h2 className="text-xl font-semibold mb-4">Toggle Aspect</h2>
        <SimpleSelect  />
      </div>

      <div className="my-10">
        <h2 className="text-xl font-semibold mb-4">SearchBar Aspect</h2>
        <SearchBar  />
        <SearchBar showFilter />  
        <SearchBar showFilter showSort /> 
      </div>

      <div className="mt-10 w-1/2">
        <InputSelect />
      </div>
      <div className="mt-10 w-1/2">
        <InputBirthDate />

      </div>
      <div className="mt-10">
        <FooterLanding />
      </div>
    </>
  );
}
