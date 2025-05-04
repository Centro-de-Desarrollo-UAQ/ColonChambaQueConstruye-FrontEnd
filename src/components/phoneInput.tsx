"use client";

import CustomSelect from "./select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { phoneExtensions } from "@/data/selectOptions";
import { useState } from "react";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  description?: string;
  showError?: boolean;
}

export default function PhoneInput({ 
  value = "", 
  onChange, 
  description = "", 
  showError = false 
}: PhoneInputProps) {
  const [extension, setExtension] = useState<string>("+52"); 
  const [phoneNumber, setPhoneNumber] = useState<string>(value);

  const handleExtensionChange = (value: string) => {
    setExtension(value);
    notifyChange(value, phoneNumber);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setPhoneNumber(number);
    notifyChange(extension, number);
  };

  const notifyChange = (ext: string, num: string) => {
    if (onChange) {
      const fullPhone = ext && num ? `${ext} ${num}` : "";
      onChange(fullPhone);
    }
  };

  useState(() => {
    if (value) {
      const [ext, num] = value.split(" ");
      if (ext && phoneExtensions.some(e => e.value === ext)) {
        setExtension(ext);
      }
      if (num) {
        setPhoneNumber(num);
      }
    }
  });

  const isValid = extension && phoneNumber;

  return (
    <div>
      <div className="flex items-center space-x-2 w-full">
        <div className="flex flex-col min-w-[130px]">
          <Label htmlFor="country" className="mb-1">Número de teléfono</Label>
          <CustomSelect 
            placeholder="MX (+52)" 
            options={phoneExtensions} 
            onChange={handleExtensionChange}
            value={extension}
          />
          {description && (
            <Label variant="description" className="mt-1">
              {description}
            </Label>
          )}
        </div>
        <Input 
          className="w-full mt-6" 
          type="tel" 
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      
      {showError && !isValid && (
        <p className="mt-1 text-sm text-red-500">Por favor, ingresa un número de teléfono válido</p>
      )}
    </div>
  );
}