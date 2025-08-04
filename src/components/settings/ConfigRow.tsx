import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ConfigRowProps {
  title: string;
  valueinput?: string;
  isTitle: boolean;
  placeholder: string;
  isEditable: boolean;
  editInput: boolean;
  multiline?: boolean;
}

export const ConfigRow = ({
  title,
  valueinput = '',
  isTitle,
  placeholder,
  isEditable,
  editInput,
  multiline = false,
}: ConfigRowProps) => {
  const [valueInputA, setValueInputA] = useState(valueinput);
  const [editInputA, setEditInputA] = useState(editInput);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [valueInputA, multiline]);

  return (
    <div
      className={`flex w-full items-center ${isTitle ? 'px-6' : 'px-4'} border-b border-zinc-100 ${isTitle && isEditable ? 'bg-zinc-50' : isTitle ? 'bg-zinc-50 py-4' : ''}`}
    >
      {isTitle ? (
        <>
          <h3 className="flex-1 text-[16px] font-[800]">{title}</h3>
        </>
      ) : (
        <div className="flex min-w-0 flex-1 items-center">
          <p className="min-w-[150px] py-3">{title}</p>
          {multiline ? (
            <textarea
              ref={textareaRef}
              className="min-w-0 flex-1 resize-none overflow-hidden border-none p-4 focus:outline-none"
              value={valueInputA}
              placeholder={placeholder}
              onChange={(e) => setValueInputA(e.target.value)}
              style={{ color: 'black', backgroundColor: 'transparent', opacity: 1 }}
              rows={1}
            />
          ) : (
            <Input
              className={`min-w-0 flex-1 border-none ${multiline ? 'h-auto' : 'h-[4rem]'}`}
              value={valueInputA}
              placeholder={placeholder}
              onChange={(e) => setValueInputA(e.target.value)}
              disabled={!editInputA}
              style={{ color: 'black', backgroundColor: 'transparent', opacity: 1 }}
            />
          )}
        </div>
      )}
      <div className={`ml-auto ${isEditable ? 'py-4' : 'py-6'} shrink-0`}>
        {isEditable && (
          <Button onClick={() => setEditInputA(!editInputA)} variant="edit" color="gray">
            Editar
          </Button>
        )}
      </div>
    </div>
  );
};
