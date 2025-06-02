import React from 'react';
import SignUpEmployer from '@/components/employer/SignUpEmployer';
import LinkerNavBar from '@/components/linker/LinkerNavBar';

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
