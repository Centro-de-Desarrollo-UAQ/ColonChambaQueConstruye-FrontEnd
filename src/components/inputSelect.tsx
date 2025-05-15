import CustomSelect from './select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { currencyOptions, phoneExtensions } from '@/data/selectOptions';

export default function InputSelect() {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedAgeOption, setSelectedAgeOption] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Primera fila - Selector de moneda con inputs */}
      <div className="flex w-full items-center space-x-2">
        <div className="flex min-w-[120px] flex-col">
          <Label htmlFor="currency" className="mb-1">
            Moneda
          </Label>
          <CustomSelect
            placeholder="Elegir..."
            options={currencyOptions}
            onChange={setSelectedCurrency}
          />
          <Label htmlFor="description" variant="description" className="mt-1">
            Description
          </Label>
        </div>
        <div className="flex w-full items-center">
          <Input className="w-full" type="number" placeholder="Monto 1" currency={true} />
          <p className="mx-2 text-center">-</p>
          <Input className="w-full" type="number" placeholder="Monto 2" currency={true} />
        </div>
      </div>

      {/* Segunda fila - Selector de rango de edad (condicional) */}
      <div className="flex w-full items-center space-x-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="min-age" className="mb-1">
              Edad
            </Label>
            <Input className="w-full" type="number" placeholder="Edad mínima" />
            <Label htmlFor="min-age" variant="description" className="mt-1">
              Descripcion
            </Label>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-center">-</p>
          </div>
          <div className="flex-1">
            <Input className="w-full" type="number" placeholder="Edad máxima" />
          </div>
        </div>
      </div>

      {/* Tercera fila - Teléfono */}
      <div className="flex w-full items-center space-x-2">
        <div className="flex min-w-[120px] flex-col">
          <Label htmlFor="country" className="mb-1">
            País
          </Label>
          <CustomSelect placeholder="MX (+52)" options={phoneExtensions} />
          <Label htmlFor="country" variant="description" className="mt-1">
            Descripción
          </Label>
        </div>
        <Input className="w-full" type="number" placeholder="Número de teléfono" />
      </div>
    </div>
  );
}
