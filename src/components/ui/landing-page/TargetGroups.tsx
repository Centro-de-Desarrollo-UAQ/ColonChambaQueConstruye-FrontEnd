"use client";

import Image from "next/image";
import Link from "next/link";
import { targetGroups } from "@/constants";
import { Button } from "../button";
import clsx from "clsx";
import router from "next/router";

export function TargetGroups() {
  return (
    <>
      {targetGroups.map(
        (
          { adviceHref, adviceText, description, image, signInHref, signInText, title },
          index
        ) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-12 px-6 lg:px-48 pb-10 lg:pb-20 pt-10 lg:pt-20 items-center"
          >
            <div
              className={clsx(
                "flex flex-col gap-4 flex-1 text-center lg:text-left p-4 lg:p-20",
                index % 2 === 0 ? "lg:order-2" : "lg:order-1"
              )}
            >
              <h3 className="text-3xl mb-5 mt-[-5] font-bold">{title}</h3>
              <Link
                className="text-uaq-brand mb-5 hover:scale-105 transition-all w-fit mx-auto lg:mx-0"
                href={adviceHref}
              >
                {adviceText}
              </Link>
              <p className="leading-loose mb-5">{description}</p>
              <Button
                onClick={() => (router.push(signInHref))}
                variant="default"
                className="w-fit mx-auto lg:mx-0"
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
                "rounded-[32px] flex-1 aspect-square object-cover",
                index % 2 === 0 ? "lg:order-1" : "lg:order-2"
              )}
            />
          </div>
        )
      )}
    </>
  );
}