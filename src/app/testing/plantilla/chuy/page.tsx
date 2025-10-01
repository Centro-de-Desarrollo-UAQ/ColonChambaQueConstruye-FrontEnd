'use client';
import Header from '@/components/ui/header';
import HeaderLinker from '@/components/ui/header.linker';
import LandingHeader from '@/components/ui/landing-header';

export default function Page() {
    return (
        <>
            <Header/>
            <p className='height-200'></p>
            <HeaderLinker/>
            <p className='height-200'></p>
            <LandingHeader/>
            
        </>
    );
}