import { GalleryAdd } from "@solar-icons/react";
import { Button } from "../button";

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
        Añade una foto alusiva a la empresa como foto de perfil. Si no cuentas con una
        ahora, podrás hacerlo más adelante.
      </p>
      <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>
      <div
        className="border border-dashed border-zinc-200 rounded-lg p-8 flex flex-col items-center justify-center relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop} 
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Imagen seleccionada"
            className="w-55 h-55 rounded-full object-cover mb-4"
          />
        ) : (
          <>
            <GalleryAdd className="w-24 h-24 text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm mb-4">
              Arrastra y suelta tu foto aquí ó
            </p>
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
          <Button
            variant="secondary"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Selecciona un archivo
          </Button>
        )}
        {selectedImage && (
          <Button variant="destructive" onClick={handleRemoveImage}>
            Borrar
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageUploadStep;