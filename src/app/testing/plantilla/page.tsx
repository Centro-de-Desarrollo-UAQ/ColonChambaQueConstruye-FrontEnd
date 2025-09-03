'use client';
import React, { useState } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonNavBar } from '@/components/navbar/ButtonNavBar';
import { Badge } from '@/components/ui/badge';
import LinkerNavBar from '@/components/linker/LinkerNavBar';
import ApplicantNavBar from '@/components/applicant/ApplicantNavBar';
import FooterLanding from '@/components/landing-page/FooterLanding';
import DropdownSelect from '@/components/toreview/dropdownselect';
import SimpleSelect from '@/components/toreview/simpleselect';
import { Eye, AddCircle, User } from '@solar-icons/react';
import { FormField } from '@/components/forms/FormField';
import { InfoCard } from '@/components/settings/InfoCard';
import { ConfigRow } from '@/components/settings/ConfigRow';
import CompanyCard from '@/components/linker/CompanyCard';
import StepperRegister from '@/components/applicant/ApplicantSignUp';
import LinkerHeader from '@/components/linker/LinkerHeader';
import QuestionItem from '@/components/landing-page/QuestionItem';
import SearchBar from '@/components/toreview/searchbar';
import FormAge from '@/components/forms/FormAge';
import { useForm, FormProvider } from 'react-hook-form';
import FormSalaryRange from '@/components/forms/FormRangeSalary';

interface FormValues {
  ageRange: string; // para el grupo
  minAge: number;
  maxAge: number;
  // otros campos...
}

export default function Home() {
  const [visibleBadges, setVisibleBadges] = useState({
    outlineClosable: true,
    defaultClosable: true,
    secondaryClosable: true,
    destructiveClosable: true,
  });
  
  return (
    <>
      <div className="space-y-4">

        

        <h1 className="px-">Hola yo soy la plantilla</h1>
        <p>Puedes copiar mi codigo y pegarlo cuando agregues tu ruta para pŕobar tus componentes <br/> Mucha suerte! </p>

        <div className="my-8 flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Button Variants</h2>
          <p>Primary:</p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="primary" color="brand">
                Primary
              </Button>
              <Button variant="primary" color="accent">
                Primary
              </Button>
              <Button variant="primary" color="danger">
                Primary
              </Button>
              <Button variant="primary" color="gray">
                Primary
              </Button>
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
              <Button variant="secondary" color="brand">
                Secondary
              </Button>
              <Button variant="secondary" color="accent">
                Secondary
              </Button>
              <Button variant="secondary" color="danger">
                Secondary
              </Button>
              <Button variant="secondary" color="gray">
                Secondary
              </Button>
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
              <Button variant="edit" color="brand">
                Edit
              </Button>
              <Button variant="edit" color="accent">
                Edit
              </Button>
              <Button variant="edit" color="danger">
                Edit
              </Button>
              <Button variant="edit" color="gray">
                Edit
              </Button>
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
              <Button variant="ghost" color="brand">
                Ghost
              </Button>
              <Button variant="ghost" color="accent">
                Ghost
              </Button>
              <Button variant="ghost" color="danger">
                Ghost
              </Button>
              <Button variant="ghost" color="gray">
                Ghost
              </Button>
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
              <Button variant="mono" color="brand">
                Mono
              </Button>
              <Button variant="mono" color="accent">
                Mono
              </Button>
              <Button variant="mono" color="danger">
                Mono
              </Button>
              <Button variant="mono" color="gray">
                Mono
              </Button>
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
      
     
    </>
  );
}
