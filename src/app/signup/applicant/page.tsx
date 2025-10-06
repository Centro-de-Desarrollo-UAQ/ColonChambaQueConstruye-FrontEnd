
import ApplicantSignUp from '@/components/applicant/ApplicantSignUp';
import Headersimple from '@/components/ui/header-simple';

export default function Signup() {
  return (
    <>
      <Headersimple />
      <div
        className="flex min-h-screen flex-col items-center justify-center py-15"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '',
          backgroundBlendMode: 'overlay',
        }}
      >
        <ApplicantSignUp />
      </div>
    </>
  );
}
