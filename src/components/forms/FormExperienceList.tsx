'use client';

import {
    FieldValues,
    Path,
    useFieldArray,
    useWatch,
} from 'react-hook-form';
import { AddCircle, TrashBinTrash } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import { useEffect } from 'react';
import { FormExperienceListProps } from '@/interfaces';
import { listYearsOptionsConstants } from '@/constants';

export default function FormExperienceList<T extends FieldValues>({
    control,
    name,
    className,
    onChangeList,
}: FormExperienceListProps<T>) {
    const { fields, append, remove } = useFieldArray<T>({
        control,
        name,
    });

    const fieldValues = useWatch({
        control,
        name: name as Path<T>,
    }) || [];

    // Notify parent component of changes in the list
    useEffect(() => {
        if (onChangeList) {
            onChangeList(fieldValues);
        }
    }, [fieldValues, onChangeList]);

    // Auto fill the first field if none exists
    useEffect(() => {
        if (fields.length === 0) {
            append({ skill: '', years: '0 years' } as unknown as T[keyof T]);
        }
    }, [append, fields]);

    return (
        <div className={cn('space-y-4', className)}>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                    {/* Skill */}
                    <div className="flex-1">
                        <FormInput
                            control={control}
                            label="Habilidad"
                            name={`${name}.${index}.skill` as Path<T>}
                        />
                    </div>

                    {/* Experience Years */}
                    <div className="w-40">
                        <FormOptions
                            control={control}
                            label="Años de experiencia"
                            name={`${name}.${index}.years` as Path<T>}
                            placeholder="Años"
                            type="select"
                            options={listYearsOptionsConstants}
                        />
                    </div>

                    {/* Delete field */}
                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        color="danger"
                        onClick={() => remove(index)}
                    >
                        <TrashBinTrash />
                    </Button>
                </div>
            ))}

            {/* Button */}
            <Button
                variant="secondary"
                color="brand"
                type="button"
                onClick={() => append({ skill: '', years: '0 years' } as unknown as T[keyof T])}
            >
                <AddCircle weight="Bold" />
                Añadir conocimiento
            </Button>
        </div>
    );
}