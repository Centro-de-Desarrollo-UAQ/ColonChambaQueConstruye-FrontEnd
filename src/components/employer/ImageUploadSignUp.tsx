import ImageDropzone from "../common/ImageDropzone";

interface ImageUploadStepProps {
  setSelectedImage: (image: string | null) => void;
}

function ImageUploadStep({ setSelectedImage }: ImageUploadStepProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold">Foto de perfil</h3>
      <p className="mb-4">
        Añade una foto alusiva a la empresa como foto de perfil. Si no cuentas con una ahora, podrás hacerlo más adelante.
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
          <Button variant="ghost" color="accent" onClick={handleRemoveImage}>
            Borrar
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageUploadStep;