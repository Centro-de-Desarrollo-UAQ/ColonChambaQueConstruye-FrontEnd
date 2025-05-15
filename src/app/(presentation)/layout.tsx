import Navbar from '@/components/linkerNavBar';
import FooterLanding from '@/components/footerLanding';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <div className="bg-zinc-50 pt-40">
        <FooterLanding />
      </div>
    </div>
  );
}
