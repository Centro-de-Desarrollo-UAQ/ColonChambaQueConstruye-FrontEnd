'use client';
import Header from '@/components/ui/header';
import HeaderLinker from '@/components/ui/header.linker';
import LandingHeader from '@/components/ui/landing-header';
import Alert from '@/components/ui/Alerts';

export default function Page() {

    return (
        <>
            <Header/>
            <p className='height-200'></p>
            <HeaderLinker/>
            <p className='height-200'></p>
            <LandingHeader/>
            <p className='height-200'></p>
            <Alert type="error" title="Alerta 1" description="Esta es la descripción de la alerta 1" />
            <p className='height-200'></p>
            <Alert type="warning" title="Alerta 2" description="Esta es la descripción de la alerta 2" />
        </>
    );
}