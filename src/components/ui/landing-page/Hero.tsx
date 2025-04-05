import Image from "next/image";
import { Button } from "../button";

export function Hero() {
  return (
    <div className=" p-10 flex flex-col md:flex-row items-center justify-between md:px-16 lg:px-48 gap-8 ">
        <div className="flex flex-col w-full h-full md:w-[686px] gap-4">
            <h1 className="text-4xl text-zinc-800 font-bold">Plataforma virtual de empleo y bolsa de trabajo UAQ</h1>

            <p className="text-zinc-800 w-[400px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aliquam tristique non dolor sit amet dapibus. In et sollicitudin sapien. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aliquam tristique non dolor sit amet dapibus. In et sollicitudin sapien. 
            </p>

            <div className="mt-12 flex gap-4">
            <Button variant="default">Regístrate ahora</Button>
            <Button variant="ghost">Inicia sesión</Button>
            </div>
        </div>

        <div className="relative w-full md:w-[630px] h-[406px] md:h-[450px]">
            <Image
                src="/hero-image-2.png"
                width={320}
                height={336}
                alt=""
                className="absolute top-0 right-0"              
            />

            <Image
                src="/hero-image-1.png"
                width={320}
                height={336}
                alt=""
                className="absolute bottom-0 left-0 bottom-[-80px]"
            /> 
        </div>
    </div>
  );
}