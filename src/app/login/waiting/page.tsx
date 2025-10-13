'use client';

import { useRouter } from 'next/navigation';
import Headersimple from '@/components/ui/header-simple';
import { EmailVerificationCode } from '@/components/ui/waitingBox';

interface User {
  email: string;
  password: string;
  status: boolean;
}


const users: User[] = [
  { email: 'activo@demo.com', password: '123456', status: true },
  { email: 'pendiente@demo.com', password: '123456', status: false },
];

export default function SignUpDos() {
  const router = useRouter();

  const user = users[1]; 

  
  if (user.status === true) {
    
    router.push('/app/employer/vacancies');
    
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Headersimple />
      <div
        className="flex min-h-screen flex-col items-center justify-center py-15"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex h-fit flex-col items-center justify-center gap-10">
          <div className="mb-6 space-y-4">
            <EmailVerificationCode />
          </div>
          <p className="text-xs text-zinc-600 text-center">
            (Usuario pendiente: <code>pendiente@demo.com</code>)
          </p>
        </main>
      </div>
    </div>
  );
}
