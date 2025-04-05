import Navbar from '@/components/linkerNavBar'; 
import FooterLanding from '@/components/footerLanding';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <div className="pt-40 bg-zinc-50">
        <FooterLanding />
      </div>
    </div>
  );
}