'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { CompanyAdvertising } from '@/interfaces';

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
      <div className="h-3 w-3 rounded-full border-2 border-zinc-600 bg-transparent"></div>
    ),
    dotsClass:
      'slick-dots flex justify-center mt-4 [&>li]:mx-1 [&>li>div]:transition-colors [&>li.slick-active>div]:bg-zinc-600',
  };

  return (
    <div className="slider-container px-4 sm:px-12 lg:px-48">
      <Slider {...settings} asNavFor={nav2 || undefined} ref={(slider) => setNav1(slider)}>
        {companies.map(({ title, image, description }) => (
          <div
            key={title}
            className="!flex !flex-col items-center gap-6 sm:!flex-row sm:gap-8 lg:gap-12"
          >
            <Image
              src={image}
              width={300}
              height={200}
              alt="Empresa"
              className="aspect-video h-[200px] w-full flex-1 rounded-lg object-cover sm:h-[300px] sm:w-[400px] md:h-[325px] md:w-[500px] lg:w-[600px]"
            />
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 sm:items-start sm:px-6 lg:px-10">
              <h3 className="text-center text-2xl font-bold sm:text-left sm:text-2xl lg:text-3xl">
                {title}
              </h3>
              <p className="text-center text-base leading-relaxed sm:text-left sm:text-base sm:leading-loose lg:text-lg">
                {description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
