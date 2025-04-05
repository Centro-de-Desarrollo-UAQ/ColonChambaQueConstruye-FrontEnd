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
      <div className="w-3 h-3 border-2 border-zinc-600 rounded-full bg-transparent"></div>
    ),
    dotsClass:
      "slick-dots flex justify-center mt-4 [&>li]:mx-1 [&>li>div]:transition-colors [&>li.slick-active>div]:bg-zinc-600",
  };

  return (
    <div className="slider-container px-4 sm:px-12 lg:px-48">
      <Slider
        {...settings}
        asNavFor={nav2 || undefined}
        ref={(slider) => setNav1(slider)}
      >
        {companies.map(({ title, image, description }) => (
          <div
            key={title}
            className="!flex !flex-col sm:!flex-row gap-6 sm:gap-8 lg:gap-12 items-center"
          >
            <Image
              src={image}
              width={300}
              height={200}
              alt="Empresa"
              className="flex-1 rounded-lg aspect-video object-cover w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[300px] md:h-[325px]"
            />
            <div className="flex flex-col flex-1 gap-4 items-center sm:items-start justify-center px-4 sm:px-6 lg:px-10">
              <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left">
                {title}
              </h3>
              <p className="text-base sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-center sm:text-left">
                {description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}