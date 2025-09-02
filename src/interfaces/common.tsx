export interface DropzoneBaseProps {
  accept: Record<string, string[]>;
  maxSizeMB?: number;
  multiple?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  onFileAccepted: (file: File) => void;
  renderContent: (args: {
    isLoading: boolean;
    fileUrl: string | null;
    handleRemove: () => void;
  }) => React.ReactNode;
}

export interface ImageDropzoneProps {
  setSelectedImage: (image: string | null) => void;
}

export interface PDFDropzoneProps {
  setSelectedFile: (file: File | null) => void;
}
