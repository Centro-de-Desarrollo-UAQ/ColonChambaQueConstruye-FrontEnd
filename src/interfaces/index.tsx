export * from './form';
export * from './jobCard';
export * from './company';
export * from './candidate';

export interface TargetGroup {
  adviceHref: string;
  adviceText: string;
  description: string;
  image: string;
  signInHref: string;
  signInText: string;
  title: string;
  href: string;
}

export interface CompanyAdvertising {
  image: string;
  title: string;
  description: string;
}

export interface TargetGroup {
  adviceHref: string;
  adviceText: string;
  description: string;
  image: string;
  signInHref: string;
  signInText: string;
  title: string;
  href: string;
}
