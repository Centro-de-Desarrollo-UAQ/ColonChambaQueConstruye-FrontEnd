'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { UploadFile } from './UploadFile';
import { UploadedFile } from './UploadedFile';

interface UploadModalProps {
  onClose: () => void;
  onSave: (files: { spanishCV: File | null; englishCV: File | null }) => void;
}

export type Language = 'spanish' | 'english';

export const COMMON_TEXTS = {
  dropText: 'Arrastra y suelta tu curriculum aquí ó',
  buttonText: 'Selecciona un archivo',
  cancel: 'Cancelar',
  continue: 'Continuar',
};

export const LANGUAGE_SPECIFIC_TEXTS = {
  spanish: {
    tabTitle: 'CV Español',
    fileName: 'CV_ESP.pdf',
  },
  english: {
    tabTitle: 'CV Inglés',
    fileName: 'CV_ENG.pdf',
  },
};

export default function UploadModal({ onClose, onSave }: UploadModalProps) {
  const [spanishCV, setSpanishCV] = useState<File | null>(null);
  const [englishCV, setEnglishCV] = useState<File | null>(null);
  const [tabValue, setTabValue] = useState<Language>('spanish');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const onDropSpanish = useCallback((acceptedFiles: File[]) => {
    setSpanishCV(acceptedFiles[0]);
  }, []);

  const handleContinue = () => {
    onSave({ spanishCV, englishCV });
    onClose();
  };

  const canContinue = !!spanishCV || !!englishCV;

  const onDropEnglish = useCallback((acceptedFiles: File[]) => {
    setEnglishCV(acceptedFiles[0]);
  }, []);

  const handleRemove = (language: Language) => {
    language === 'spanish' ? setSpanishCV(null) : setEnglishCV(null);
  };

  const handleFileChange = (language: Language, newFile: File) => {
    language === 'spanish' ? setSpanishCV(newFile) : setEnglishCV(newFile);
  };

  const getTexts = (language: Language) => ({
    ...COMMON_TEXTS,
    ...LANGUAGE_SPECIFIC_TEXTS[language],
  });

  const renderTabContent = (language: Language) => {
    const hasFile = language === 'spanish' ? !!spanishCV : !!englishCV;
    const file = language === 'spanish' ? spanishCV : englishCV;
    const texts = getTexts(language);

    return (
      <TabsContent key={language} value={language}>
        <Card
          className={`flex flex-col bg-zinc-50 pt-10 ${hasFile ? 'min-h-[300px]' : 'min-h-[500px]'}`}
        >
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="spanish">{LANGUAGE_SPECIFIC_TEXTS.spanish.tabTitle}</TabsTrigger>
              <TabsTrigger value="english">{LANGUAGE_SPECIFIC_TEXTS.english.tabTitle}</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col items-center justify-center py-4">
            {!hasFile ? (
              <UploadFile
                language={language}
                onDrop={language === 'spanish' ? onDropSpanish : onDropEnglish}
                dropText={texts.dropText}
                buttonText={texts.buttonText}
              />
            ) : (
              <UploadedFile
                file={file || new File([], texts.fileName)}
                defaultFileName={texts.fileName}
                action="upload"
                onView={() => file && window.open(URL.createObjectURL(file), '_blank')}
                onRemove={() => handleRemove(language)}
              />
            )}
          </CardContent>

          <CardFooter className="flex justify-center gap-90 pb-3">
            <Button variant="ghost" onClick={onClose}>
              {texts.cancel}
            </Button>
            <Button onClick={handleContinue} disabled={!canContinue}>
              {COMMON_TEXTS.continue}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    );
  };

  return (
    <div
      className="relative mx-auto w-full max-w-2xl shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
      <Tabs value={tabValue} onValueChange={(val) => setTabValue(val as Language)}>
        {renderTabContent('spanish')}
        {renderTabContent('english')}
      </Tabs>
    </div>
  );
}
