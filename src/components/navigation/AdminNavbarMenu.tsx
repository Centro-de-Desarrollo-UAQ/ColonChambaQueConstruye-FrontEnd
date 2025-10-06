import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator';


interface Button {
    id: number;
    text: string; //texto visible en el botón
    ref: string; //URL del destino de la navegación
}

//Array de inlaces para la navegación
const navLinks: Button[] = [
    { id: 1, text: 'Por aprobar', ref: '' },
    { id: 2, text: 'Aprobadas', ref: '' },
    { id: 3, text: 'Rechazadas', ref: '' },
    { id:4, text: 'Todas', ref: '' }
]

const AdminNavbarMenu = () => {

    //Manejador de eventos de clic
    const[button, setButton] = useState<number | null>(null);

    const handleClick = (linkId: number) => {
        setButton(linkId);
    }

  return (
    <nav className='flex justify-start gap-4 bg-uaq-terniary py-[8px] px-[48px] items-center'>
        <p className='text-white font-bold  text-base'>texto</p>
        <div className='h-[43px]'><Separator orientation='vertical'/></div>
        {navLinks.map((link) => (
            <div key={link.id}>
                    {/*Condición terniaria que identifica el botón que está activo para cambiarle el color*/}
                    <Button onClick={() => handleClick(link.id)} variant='third' color={button === link.id ? 'brand' : 'accent'} >{link.text}</Button>
            </div>

        ))}
    </nav>
  )
}

export {AdminNavbarMenu};
