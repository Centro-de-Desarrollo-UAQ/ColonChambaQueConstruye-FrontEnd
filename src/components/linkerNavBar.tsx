"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import { ButtonNavBar } from "@/components/ui/buttonNavBar"
import { Button } from "./ui/button"
import Link from "next/link"

export default function LinkerNavBar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/servicios", label: "Servicios UAQ" },
    { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
    { href: "/publicar-empleos", label: "Publicar empleos" }
  ]

  return (
    <nav className="flex items-center justify-between bg-uaq-accent px-20">
      {/* Logos alineados */}
      <div className="flex items-center gap-4">
          <Link href="/">
            <Image 
              src="/UAQ logo.svg" 
              alt="UAQ Logo" 
              width={120} 
              height={120}
              className="w-6 h-7" 
            />
          </Link>
          <Link href="/">
            <Image 
              src="/BTWhite.svg" 
              alt="Bolsa de Trabajo Logo" 
              width={120} 
              height={120}
              className="w-30 h-8" 
            />
          </Link>
      </div>

      {/* Categorías */}
      <div className="flex text-uaq-default-50 font-[400] font-futura">
        {navLinks.map(({ href, label }) => (
          <ButtonNavBar
            key={href}
            asChild
            variant="default"
            size="default"
            className={`relative hover:text-uaq-primary ${
              pathname === href ? "text-uaq-primary" : ""
            }`}
          >
            <a href={href}>
              {label}
              {pathname === href && (
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-uaq-primary"></span>
              )}
            </a>
          </ButtonNavBar>
        ))}
      </div>

      {/* Ingresar */}
      <Button
        onClick={() => window.location.href = "/publicar-empleos"}
        variant="ghost"
        size="default"
      >
        Ingresar
      </Button>
    </nav>
  )
}
