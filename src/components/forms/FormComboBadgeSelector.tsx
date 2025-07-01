'use client';

import { useController, FieldValues } from 'react-hook-form';
import FormOptions from '@/components/forms/FormOptions';
import { Badge } from '@/components/ui/badge';
import { FormComboBadgeSelectorProps } from '@/interfaces';

export default function FormComboBadgeSelector<T extends FieldValues>({
    control,
    name,
    label,
    description,
    options,
}: FormComboBadgeSelectorProps<T>) {
    const {
        field: { value = [], onChange },
    } = useController({ name, control });

    const selected = value as string[];

    const handleAdd = (selectedValue: string) => {
        if (!selected.includes(selectedValue)) {
            onChange([...selected, selectedValue]);
        }
    };

    const handleRemove = (valToRemove: string) => {
        onChange(selected.filter((v) => v !== valToRemove));
    };

    const availableOptions = options.filter((opt) => !selected.includes(opt.value));

    return (
        <div className="space-y-2">
            <FormOptions
                control={control}
                name={name}
                label={label}
                description={description}
                options={availableOptions}
                type="combobox"
                placeholder='Seleccione una opción'
                onSelect={handleAdd}
            />

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {selected.map((item) => {
                        const opt = options.find((o) => o.value === item);
                        return (
                            <Badge key={item} variant="outline" onClose={() => handleRemove(item)}>
                                {opt?.label ?? item}
                            </Badge>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
