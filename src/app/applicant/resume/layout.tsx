import ApplicantNavBar from '@/components/applicant/ApplicantNavBar';
export default function CurriculumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Stepper en la parte superior */}
      <header className="border-b">
        <ApplicantNavBar />
      </header>

      {/* Contenido principal */}
      <main className="flex-grow py-10">{children}</main>
    </div>
  );
}
