import Image from "next/image";
import Link from "next/link";

export function ContactUs() {
  return (
    <section className="flex flex-col items-center gap-8 py-12 px-6 sm:gap-10 sm:py-16 sm:px-12 lg:gap-12 lg:py-24 lg:px-48">
      <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center">
        ¡Conéctate con nosotros en redes sociales!
      </h3>

      <div className="flex flex-wrap gap-4 sm:gap-8 lg:gap-10 justify-center">
        <Link href="/" aria-label="Facebook">
          <Image
            src="/facebook.svg"
            width={32}
            height={32}
            alt="Facebook"
            className="w-8 h-8 sm:w-10 sm:h-8 lg:w-10 lg:h-10"
          />
        </Link>
        <Link href="/" aria-label="LinkedIn">
          <Image
            src="/linkedin.svg"
            width={32}
            height={32}
            alt="LinkedIn"
            className="w-8 h-8 sm:w-10 sm:h-8 lg:w-10 lg:h-10"
          />
        </Link>
        <Link href="/" aria-label="YouTube">
          <Image
            src="/youtube.svg"
            width={32}
            height={32}
            alt="YouTube"
            className="w-8 h-8 sm:w-10 sm:h-8 lg:w-10 lg:h-10"
          />
        </Link>
        <Link href="/" aria-label="Instagram">
          <Image
            src="/instagram.svg"
            width={32}
            height={32}
            alt="Instagram"
            className="w-8 h-8 sm:w-10 sm:h-8 lg:w-10 lg:h-10"
          />
        </Link>
      </div>

      <p className="text-center text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose max-w-3xl">
        Mantente al día con las últimas noticias, eventos y oportunidades laborales.
        Síguenos en Facebook e Instagram para ser parte de nuestra comunidad,
        conocer historias de éxito y recibir contenido exclusivo que te ayudará a avanzar en tu carrera.
      </p>
    </section>
  );
}