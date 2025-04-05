"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { CompanyAdvertising } from "@/interfaces";

interface Props {
  companies: CompanyAdvertising[];
}

export function Advertising({ companies }: Props) {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    customPaging: () => (
      <div className="w-3 h-3 border-2 border-zinc-600 rounded-full bg-transparent mt-10"></div>
    ),
    dotsClass:
      "slick-dots flex justify-center mt-4 [&>li]:mx-1 [&>li>div]:transition-colors [&>li.slick-active>div]:bg-zinc-600",
  };

  return (
    <div className="slider-container px-48">
      <Slider
        {...settings}
        asNavFor={nav2 || undefined}
        ref={(slider) => setNav1(slider)}
      >
        {companies.map(({ title, image, description }) => (
          <div key={title} className="!flex !gap-12">
            <Image
              src={image}
              width={500}
              height={325}
              alt="Empresa"
              className="flex-1 rounded-3xl aspect-video object-cover w-full"
            />
            <div className="flex flex-col flex-1 gap-4 items-center justify-center">
              <h3 className="text-3xl font-bold text-center">{title}</h3>
              <p className="leading-loose text-center">{description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
