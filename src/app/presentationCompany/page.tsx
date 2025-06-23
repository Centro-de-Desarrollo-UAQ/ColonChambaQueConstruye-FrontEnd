import { Advertising } from '@/components/landing-page/Advertising';
import { Welcome } from '@/components/landing-page-company/Welcome';
import { StepsVacant } from '@/components/landing-page-company/StepsVacant';
import { CompanyAdvertising } from '@/interfaces';
import { fakeAdsCompanies } from '@/constants';
import { ContactTalent } from '@/components/landing-page-company/ContactTalent';
import { ContactUs } from '@/components/landing-page-company/ContactUs';
import { Metrics } from '@/components/landing-page-company/Metrics';


async function getAdvertisingCompanies(): Promise<CompanyAdvertising[] | void> {
  // fetch to have companies that have purchased the ads section
  // If something wrong, then return void
  // return;

  return fakeAdsCompanies;
}

export default async function LandingPage() {
  return (
    <>
      <div className="bg-zinc-50">
        <div className="space-y-4 pt-20 pb-20 bg-[url(/Foto_Propuesta_JA.jpg)] bg-cover bg-center bg-no-repeat">
          <Welcome />
        </div>
        <div className="space-y-4 pt-20 pb-20">
          <StepsVacant />
        </div>
        <div className="space-y-4 pt-20 pb-20">
          <ContactTalent />
        </div>
        <div className="space-y-4 pt-20 pb-20">
          <Metrics />
        </div>
        <div className="space-y-4 bg-zinc-200 pt-10 pb-10">
          <ContactUs />
        </div>
      </div>
    </>
  );
}
