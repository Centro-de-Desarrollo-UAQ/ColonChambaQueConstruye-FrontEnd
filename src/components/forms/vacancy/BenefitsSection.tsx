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
                title="Prestaciones laborales"
                className='text-uaq-terniary font-normal'
            />
            <FormInput
                control={control}
                label="Prestaciones ofrecidas"
                name="benefits"
                type="textarea"
                description="Menciona beneficios adicionales (ejemplo: aguinaldo, seguro médico, vales de despensa)"
                maxChars={1000}
            />
        </section>
    );
}