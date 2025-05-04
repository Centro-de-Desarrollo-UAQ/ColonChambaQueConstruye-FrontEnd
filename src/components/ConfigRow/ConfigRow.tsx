import React, { useState } from "react"; 
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <div className={`flex w-full items-center ${isTitle ? "px-6" : "px-4"} border-b border-uaq-default-100 ${isTitle && isEditable ? "bg-uaq-default-50" : isTitle ? "bg-uaq-default-50 py-4" : ""}`}>
      {isTitle ? (
        <>
          <h3 className="text-uaq-default-800 font-bold text-[16px] flex-1">
            {title}
          </h3>
        </>
      ) : (
        <div className="flex items-center min-w-0 flex-1">
          <p className="py-3 min-w-[150px]">{title}</p>
          <Input
            className="border-none h-[4rem] flex-1 min-w-0"
            value={valueInputA}
            placeholder={placeholder}
            onChange={(e) => setValueInputA(e.target.value)}
            disabled={!editInputA}
            style={{ color: "black", backgroundColor: "transparent", opacity: 1 }}
          />
        </div>
      )}
      <div className={`ml-auto ${isEditable ? "py-4" : "py-6"} shrink-0`}>
        {isEditable && (
          <Button onClick={() => setEditInputA(!editInputA)} variant="edit" color="gray">
            Editar
          </Button>
        )}
      </div>
    </div>
  );
};