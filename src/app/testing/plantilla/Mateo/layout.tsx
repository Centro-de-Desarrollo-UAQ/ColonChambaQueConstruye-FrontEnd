'use client';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar'
import Header from '@/components/ui/header'
import { StarShine } from '@solar-icons/react';
import React from 'react'

export default function LayoutEmployerView ({ children }: { children: React.ReactNode }) {


  return (
    <div className="">
        <div className='w-full fixed'>
            <Header />
        </div>
        <div className='flex'>
            <div className='mt-[72px] fixed'>
                <EmployerSideBar />
            </div>
            <div className='w-full'>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
        
    </div>
  )
}
