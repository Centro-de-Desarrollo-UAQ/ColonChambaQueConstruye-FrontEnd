'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const navLinks = [
    { id: 1, text: 'Por aprobar', slug: '' },
    { id: 2, text: 'Aprobadas', slug: 'aproved' },
    { id: 3, text: 'Rechazadas', slug: 'rejected' }
]

interface AdminNavbarProps {
    NameTitle: string;
    basePath: 'users' | 'companies' | 'vacancies';
}

const AdminNavbarMenu = ({ NameTitle, basePath }: AdminNavbarProps) => {
    const pathname = usePathname();

    return (
        <nav className='flex justify-start gap-4 bg-uaq-terniary py-[8px] px-[48px] items-center'>
            <p className='text-white font-bold text-base'>{NameTitle}</p>
            
            <div className='h-[43px]'>
                <Separator orientation='vertical' />
            </div>

            {navLinks.map((link) => {
                const href = `/linker/home/${basePath}/${link.slug}`;
                
                const isActive = (link.slug == '' ? pathname === `/linker/home/${basePath}` : pathname.includes(link.slug));

                return (
                    <div key={link.id}>
                        <Link href={href}>
                           
                            <Button 
                                variant='third' 
                                color={isActive ? 'brand' : 'accent'}
                            >
                                {link.text}
                            </Button>
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}

export { AdminNavbarMenu };