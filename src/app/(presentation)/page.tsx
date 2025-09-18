import { Hero } from '@/components/landing-page/Hero';
import { CompanyAdvertising } from '@/interfaces';
import { fakeAdsCompanies } from '@/constants';
import { AppropriateJob } from '@/components/landing-page/AppropriateJob';
import { TargetGroups } from '@/components/landing-page/TargetGroups';


async function getAdvertisingCompanies(): Promise<CompanyAdvertising[] | void> {
  // fetch to have companies that have purchased the ads section
  // If something wrong, then return void
  // return;

  return fakeAdsCompanies;
}

export default async function LandingPage() {
  const advertisingCompanies = await getAdvertisingCompanies();
  return (
    <>
      <div className="bg-zinc-50">
        <div className="space-y-4 pt-20 pb-20">
          <Hero />
        </div>
        <div className="space-y-4 pt-20 pb-10">
          <AppropriateJob />
        </div>
        <div className="space-y-2 pt-10 pb-20">
          <TargetGroups />
        </div>
      </div>
    </>
  );
}
