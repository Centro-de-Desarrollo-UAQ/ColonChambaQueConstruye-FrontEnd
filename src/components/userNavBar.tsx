"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Bell, Case, Document, HomeAngle } from "@solar-icons/react"
import { ButtonNavBar } from "./ui/buttonNavBar"

export default function UserNavBar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/inicio", label: "INICIO", icon: <HomeAngle weight="Bold" size={24}/> },  
    { href: "/empleos", label: "EMPLEOS", icon: <Case weight="Bold" size={24}/> },  
    { href: "/curriculums", label: "CURRICULUMS", icon: <Document weight="Bold" size={24}/> },  
    { href: "/alertas", label: "ALERTAS", icon: <Bell weight="Bold" size={24}/> },  
  ]

  return (
    <nav className="flex items-center justify-between bg-uaq-accent h-[3rem] px-20">
      {/* Logo de "Bolsa de Trabajo" alineado a la izquierda */}
      <div className="flex items-center">
        <Link href="/">
          <Image 
            src="/UAQ logo.svg" 
            alt="UAQ Logo" 
            width={120} 
            height={120}
            className="w-6 h-6" 
          />
        </Link>
        <Link href="/">
          <Image 
            src="/BTWhite.svg" 
            alt="Bolsa de Trabajo Logo" 
            width={120} 
            height={120}
            className="w-25 h-5" 
          />
        </Link>
      </div>

      {/* Categorías y avatar alineados a la derecha */}
      <div className="flex gap-6 items-center ml-auto h-full">
        {/* Categorías */}
        <div className="flex text-uaq-default-50 font-[400] font-futura h-full">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href} className="h-full">
              <ButtonNavBar 
                variant={pathname === href ? "active" : "hover"} 
                size="sm"
                className="h-full px-6 flex items-center gap-2"
              >
                {icon}
                {label}
              </ButtonNavBar>
            </Link>
          ))}
        </div>

        {/* Avatar */}
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
