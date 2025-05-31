import { GalleryAdd } from '@solar-icons/react';
import { Button } from '../ui/button';

interface ImageUploadStepProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

function ImageUploadStep({ selectedImage, setSelectedImage }: ImageUploadStepProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold">Foto de perfil</h3>
      <p className="mb-4">
        Añade una foto alusiva a la empresa como foto de perfil. Si no cuentas con una ahora, podrás
        hacerlo más adelante.
      </p>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>
      <div
        className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Imagen seleccionada"
            className="mb-4 h-55 w-55 rounded-full object-cover"
          />
        ) : (
          <>
            <GalleryAdd className="mb-4 h-24 w-24 text-gray-400" />
            <p className="mb-4 text-sm text-gray-500">Arrastra y suelta tu foto aquí ó</p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </>
        )}

        {!selectedImage && (
          <Button variant="ghost" onClick={() => document.getElementById('fileInput')?.click()}>
            Selecciona un archivo
          </Button>
        )}
        {selectedImage && (
          <Button variant="ghost" color='accent' onClick={handleRemoveImage}>
            Borrar
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageUploadStep;
