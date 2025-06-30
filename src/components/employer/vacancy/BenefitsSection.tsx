'use client';

import FormInput from "@/components/forms/FormInput";
import FormSectionHeader from "./FormSectionHeader";
import { VacancyFormType } from "@/validations/registerVacancy";
import { Control } from "react-hook-form";

type Props = {
    control: Control<VacancyFormType>;
};

export default function BenefitsSection({ control }: Props) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Beneficios para el empleado"
                description="Incluya aquí los beneficios que se le otorgarán al empleado."
            />

            <FormInput
                control={control}
                label="Prestaciones ofrecidas"
                name="benefits"
                type="textarea"
                description="Indique la existencia de apoyos internos. Incluya bonos, seguros, equipo, etc."
                maxChars={1200}
            />
            <FormInput
                control={control}
                label="Beneficios adicionales"
                name="additionalBenefits"
                type="textarea"
                description="Indique apoyos como vales, subsidios, etc."
                maxChars={1200}
            />
        </section>
    );
}