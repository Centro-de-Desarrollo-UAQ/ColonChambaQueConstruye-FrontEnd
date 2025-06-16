'use client';

import Image from 'next/image';
import Link from 'next/link';
import { targetGroups } from '@/constants';
import { Button } from '../ui/button';
import clsx from 'clsx';
import router from 'next/router';

export function TargetGroups() {
  return (
    <>
      {targetGroups.map(
        ({ /*adviceHref, adviceText,*/ description, image, signInHref, signInText, title }, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-12 px-6 pt-10 pb-10 lg:flex-row lg:px-48 lg:pt-20 lg:pb-20"
          >
            <div
              className={clsx(
                'flex flex-1 flex-col gap-4 p-4 text-center lg:p-20 lg:text-left',
                index % 2 === 0 ? 'lg:order-2' : 'lg:order-1',
              )}
            >
              <h3 className="mt-[-5] mb-5 text-3xl font-bold">{title}</h3>
              <p className="mb-5 leading-loose">{description}</p>
              <Button
                onClick={() => router.push(signInHref)}
                variant="default"
                className="mx-auto w-fit lg:mx-0"
              >
                {signInText}
              </Button>
            </div>

            <Image
              src={image}
              width={450}
              height={450}
              alt="Grupo objetivo"
              className={clsx(
                'aspect-square flex-1 rounded-[32px] object-cover',
                index % 2 === 0 ? 'lg:order-1' : 'lg:order-2',
              )}
            />
          </div>
        ),
      )}
    </>
  );
}
