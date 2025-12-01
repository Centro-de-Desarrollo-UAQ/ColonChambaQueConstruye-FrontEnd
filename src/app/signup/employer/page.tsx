'use client';
import Headersimple from '@/components/ui/header-simple';
import SignUpEmployer from '@/components/employer/SignUpEmployer';

export default function SignUpEmployerPage() {
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
            <SignUpEmployer />
          </div>
        </main>
      </div>
    </div>
  );
}