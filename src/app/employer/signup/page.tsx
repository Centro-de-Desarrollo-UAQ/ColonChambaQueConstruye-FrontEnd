import React from 'react';
import SignUpEmployer from '@/components/ui/employer/SignUpEmployer';
import LinkerNavBar from '@/components/linkerNavBar';

export default function Signup() {
  return (
    <>
      <LinkerNavBar />
      <div
        className="flex min-h-screen flex-col items-center justify-center py-15"
        style={{
          backgroundImage: 'url("/backgroundSignUp.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <SignUpEmployer />
      </div>
    </>
  );
}
