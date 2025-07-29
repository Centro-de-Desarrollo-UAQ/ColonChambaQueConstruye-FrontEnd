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
      <ImageDropzone setSelectedImage={setSelectedImage} />
    </div>
  );
}

export default ImageUploadStep;