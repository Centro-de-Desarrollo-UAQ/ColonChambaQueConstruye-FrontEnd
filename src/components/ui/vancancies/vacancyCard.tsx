'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ClockCircle, Gps, AddCircle, MapPoint } from "@solar-icons/react";

interface JobCardProps {
    title: string;
    company: string;
    location?: string;
    description: string;
    salaryRange?: string;
    schedule: string;
    modality: string;
    logoUrl?: string;
    companyUrl?: string;
}

export default function JobCard({
    title,
    company,
    location,
    salaryRange,
    description,
    modality,
    schedule,
    logoUrl = '/deloitte-logo.svg', // TODO: Add a default logo if the company doesn't have one,
    companyUrl // Only add this if the company has a website
}: JobCardProps) {
    return (
        <div className="w-full max-w-[560px] border rounded-xl shadow-sm p-8 bg-white transition hover:shadow-md hover:border-zinc-400 cursor-pointer">
            <div className="flex gap-2 items-start mb-3">
                <Image src={logoUrl} alt="Company Logo" width={60} height={60} className="rounded-md self-center" />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold leading-tight">{title}</h2>
                    {companyUrl ? (
                        <Link href={companyUrl} className="text-sm underline text-blue-600 hover:text-blue-800">
                            {company}
                        </Link>
                    ) : (
                        <span className="text-sm underline">{company}</span>
                    )}
                </div>
                <div className="flex flex-col gap-3 text-xs self-center text-right text-zinc-800">
                    <div className="flex items-center gap-1">
                        <ClockCircle className="w-4 h-4" />
                        {schedule}
                    </div>
                    <div className="flex items-center gap-1">
                        <Gps className="w-4 h-4" />
                        {modality}
                    </div>
                </div>
            </div>
            {location && (
                <div className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                    <MapPoint className="w-4 h-4" />
                    {location}
                </div>
            )}
            <p className="text-sm mt-4 mb-4 text-zinc-800">
                {description}
            </p>
            <div className="flex justify-between items-end mt-4">
                <span className="text-uaq-brand font-medium">{salaryRange}</span>
                <button className="flex items-center gap-2 text-uaq-accent">
                    <AddCircle weight="Bold" className="w-4 h-4" />
                    Información
                </button>
            </div>
        </div>
    );
}