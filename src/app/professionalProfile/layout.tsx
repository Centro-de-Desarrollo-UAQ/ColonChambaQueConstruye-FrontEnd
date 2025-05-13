import UserNavBar from "@/components/userNavBar";
export default function CurriculumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
          <UserNavBar />
      </header>
      
      <main className="flex-grow py-10">
        {children}
      </main>
    </div>
  );
}