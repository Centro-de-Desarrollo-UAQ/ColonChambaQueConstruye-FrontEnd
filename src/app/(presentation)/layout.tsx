import Navbar from '@/components/linker/LinkerNavBar';
import FooterLanding from '@/components/landing-page/FooterLanding';
import LandingHeader from '@/components/ui/landing-header';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader/>
      <main className="flex-grow">{children}</main>
      
    </div>
  );
}
