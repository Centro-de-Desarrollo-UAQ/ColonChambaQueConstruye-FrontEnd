import Image from 'next/image';
import Link from 'next/link';

export function ContactUs() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 py-12 sm:gap-10 sm:px-12 sm:py-16 lg:gap-12 lg:px-48 lg:py-24">
      <h3 className="text-center text-2xl font-bold sm:text-2xl lg:text-3xl">Sigamos conectando</h3>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-10">
        <Link href="https://www.facebook.com/uaq.mx/" aria-label="Facebook" target="_blank">
          <Image
            src="/facebook.svg"
            width={32}
            height={32}
            alt="Facebook"
            className="h-8 w-8 sm:h-8 sm:w-10 lg:h-10 lg:w-10"
          />
        </Link>
        <Link href="https://mx.linkedin.com/school/uaq/" aria-label="LinkedIn" target="_blank">
          <Image
            src="/linkedin.svg"
            width={32}
            height={32}
            alt="LinkedIn"
            className="h-8 w-8 sm:h-8 sm:w-10 lg:h-10 lg:w-10"
          />
        </Link>
        <Link href="https://www.youtube.com/user/UAQmx" aria-label="YouTube" target="_blank">
          <Image
            src="/youtube.svg"
            width={32}
            height={32}
            alt="YouTube"
            className="h-8 w-8 sm:h-8 sm:w-10 lg:h-10 lg:w-10"
          />
        </Link>
        <Link href="https://www.instagram.com/uaq_mx/" aria-label="Instagram" target="_blank">
          <Image
            src="/instagram.svg"
            width={32}
            height={32}
            alt="Instagram"
            className="h-8 w-8 sm:h-8 sm:w-10 lg:h-10 lg:w-10"
          />
        </Link>
      </div>

      {/*<p className="max-w-3xl text-center text-sm leading-relaxed sm:text-base sm:leading-loose lg:text-lg">
        Mantente al día con las últimas noticias, eventos y oportunidades laborales. Síguenos en
        Facebook e Instagram para ser parte de nuestra comunidad, conocer historias de éxito y
        recibir contenido exclusivo que te ayudará a avanzar en tu carrera.
      </p>*/}
      <p className="max-w-3xl text-center text-sm leading-relaxed sm:text-base sm:leading-loose lg:text-lg">
        Síguenos en redes y no te pierdas ninguna oportunidad. Aquí compartimos lo que vale la pena:
        vacantes, historias reales y todo lo que construimos contigo.
      </p>
    </section>
  );
}
