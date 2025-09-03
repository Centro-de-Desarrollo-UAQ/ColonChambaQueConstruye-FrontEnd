'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClockCircle, Gps, AddCircle, MapPoint } from '@solar-icons/react';
import { JobCardProps } from '@/interfaces';

export default function JobCard({
  title,
  company,
  location,
  salaryRange,
  description,
  modality,
  schedule,
  logoUrl = '/Deloitte.svg', // TODO: Add a default logo if the company doesn't have one,
  information, // Only add this if you want to show more about the Job details
}: JobCardProps) {
  return (
    <div className="w-full max-w-[560px] rounded-xl border bg-white p-8 shadow-sm transition hover:border-zinc-400 hover:shadow-md">
      <div className="mb-3 flex items-start gap-2">
        <Image
          src={logoUrl}
          alt="Company Logo"
          width={60}
          height={60}
          className="self-center rounded-md"
        />
        <div className="flex-1">
          <h2 className="text-lg leading-tight font-semibold">{title}</h2>
          <span className="text-sm underline">{company}</span>
        </div>
        <div className="flex flex-col gap-3 self-center text-right text-xs text-zinc-800">
          <div className="flex items-center gap-1">
            <ClockCircle className="h-4 w-4" />
            {schedule}
          </div>
          <div className="flex items-center gap-1">
            <Gps className="h-4 w-4" />
            {modality}
          </div>
        </div>
      </div>
      {location && (
        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
          <MapPoint className="h-4 w-4" />
          {location}
        </div>
      )}
      <p className="mt-4 mb-4 text-sm text-zinc-800">{description}</p>

      <div className="mt-4 flex items-end justify-between">
        <span className="text-uaq-brand font-medium">{salaryRange}</span>
        {information ? (
          <Link href={information} className="text-uaq-accent flex items-center gap-2">
            <AddCircle weight="Bold" className="h-4 w-4" />
            Información
          </Link>
        ) : (
          <div className="text-uaq-accent flex items-center gap-2">
            <AddCircle weight="Bold" className="h-4 w-4" />
            Información
          </div>
        )}
      </div>
    </div>
  );
}
