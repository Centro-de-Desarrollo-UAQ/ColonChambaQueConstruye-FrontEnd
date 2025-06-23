import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export function ContactUs() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 py-12 sm:gap-10 sm:px-12 sm:py-16 lg:gap-12 lg:px-48 lg:py-24">
      <h3 className="text-center text-2xl font-bold sm:text-2xl lg:text-3xl">
        Estamos a tu disposición
      </h3>
      <p className="max-w-3xl text-center text-sm leading-relaxed sm:text-base sm:leading-loose lg:text-lg">
        Visite nuestro centro de preguntas frecuentes para ver las respuestas a las dudas más comunes
      </p>
      <div>
        <Button variant="primary">Preguntas Frecuentes</Button>
       </div>
    </section>
  );
}
