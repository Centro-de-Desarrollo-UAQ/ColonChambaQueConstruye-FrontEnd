import React, { useState } from "react"; 
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Interface } from "readline";

interface ConfigRowProps {
  title: string;
  valueinput?: string;
  isTitle: boolean;
  placeholder: string;
  isEditable: boolean;
  editInput: boolean;
}

export const ConfigRow = ({
  title,
  valueinput,
  isTitle,
  placeholder,
  isEditable,
  editInput
}: ConfigRowProps) => {
  const [valueInputA, setValueInputA] = useState(`${valueinput}`);
  const [editInputA, setEditInputA] = useState(editInput);
  return (
    <Card className="flex w-full flex-row h-16 justify-between items-center p-6 bg-uaq-default-50">
      {isTitle ? (
        <>
          <h3 className="text-uaq-default-800 font-bold text-[16px]">
            {title}
          </h3>
        </>
      ) : (
        <>
          <p>{title}</p>
          <Input
            className="w-auto border-none h-[4rem] flex grow"
            value={valueInputA}
            placeholder={placeholder}
            onChange={(e) => setValueInputA(e.target.value)}
            disabled={!editInputA}
            style={{ color: "black", backgroundColor: "transparent", opacity: 1 }} // Forzar estilos
          />
        </>
      )}
      {isEditable && (
        <Button onClick={()=>setEditInputA(!editInputA)} className="w-[4.4rem] h-11 bg-uaq-default-100 text-uaq-default-800 font-normal border-1 border-uaq-default-200 rounded-[0.5rem] shadow-none">
          Editar
        </Button>
      )}
    </Card>
  );
};
