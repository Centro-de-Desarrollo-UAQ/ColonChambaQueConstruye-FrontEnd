'use client';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar'
import Header from '@/components/ui/header'
import { StarShine } from '@solar-icons/react';
import React from 'react'

export default function LayoutEmployerView ({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative">
        <div className='w-full fixed top-0 left-0 z-50'>
            <Header />
        </div>
        <div className='flex'>
            <div className='fixed top-[72px] left-0'>
                <EmployerSideBar />
            </div>
            <div className='w-full'>
                <main className="flex-1 pl-6 pt-[72px] ">{children}</main>
            </div>
        </div>
        
    </div>
  )
}
