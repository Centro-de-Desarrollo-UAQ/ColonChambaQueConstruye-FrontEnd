'use client';

import { useState } from 'react';
import CustomSelect from './select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currencyOptions } from '@/data/selectOptions';

export default function CurrencyInput() {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  return (
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
        <Label variant="description" className="mt-1">
          Descripción
        </Label>
      </div>
      <div className="flex w-full items-center">
        <Input className="w-full" type="number" placeholder="Monto 1" currency={true} />
        <p className="mx-2 text-center">-</p>
        <Input className="w-full" type="number" placeholder="Monto 2" currency={true} />
      </div>
    </div>
  );
}
