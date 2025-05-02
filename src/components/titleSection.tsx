import { Diploma, Documents, ShieldKeyholeMinimalistic } from "@solar-icons/react";
import { ReactNode } from "react";

type VariantType = "curriculum" | "perfil" | "seguridad";

interface TitleSectionProps {
  variant: VariantType;
}

const variantConfig = {
  curriculum: {
    icon: <Documents size={24} weight="Bold" />,
    title: "CURRICULUM",
    description: "Cree, suba y administre sus CV para postular empleos",
  },
  perfil: {
    icon: <Diploma size={24} weight="Bold" />,
    title: "PERFIL PROFESIONAL",
    description:
      "Edite los detalles de su experiencia profesional y habilidades destacadas, además de sus preferencias laborales",
  },
  seguridad: {
    icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
    title: "ACCESO Y SEGURIDAD",
    description: "Administre la información de acceso a su cuenta",
  },
};

export default function TitleSection({ variant }: TitleSectionProps) {
  const { icon, title, description } = variantConfig[variant];

  return (
    <>
      <div className="flex items-center gap-3 bg-uaq-default-100 p-3 border-l-2 border-black">
        {icon}
        <span>{title}</span>
      </div>
      <p className="py-1">{description}</p>
    </>
  );
}