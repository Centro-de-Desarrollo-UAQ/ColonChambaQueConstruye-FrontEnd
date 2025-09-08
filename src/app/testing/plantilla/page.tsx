'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, AddCircle, User } from '@solar-icons/react';


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
              <Button variant="primary" color="secundary">
                Primary
              </Button>
              <Button variant="primary" color="accent">
                prueba
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
          
          
        </div>
      </div>
      
     
    </>
  );
}
