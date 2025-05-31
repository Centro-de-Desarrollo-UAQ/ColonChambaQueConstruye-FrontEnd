//TODO Make this component reusable and add the form wrapper
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AgeInput() {
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="flex w-full items-center gap-2">
        <div className="flex-1">
          <Label htmlFor="min-age" className="mb-1">
            Edad
          </Label>
          <Input className="w-full" type="number" placeholder="Edad mínima" />
          <Label variant="description" className="mt-1">
            Descripción
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
  );
}
