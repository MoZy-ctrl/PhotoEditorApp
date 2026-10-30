import { useRef, useState } from "react";
import Menu from "./Menu";
import SaveAsDialog from "./SaveAsDialog";
import PropertiesDialog from "./PropertiesDialog";

type HeaderProps = {
  onOpen: (img: HTMLImageElement) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};
export type ImageInfo = {
  name: string
  type: string
  size: number
  width: number
  height: number
}

function Header({ onOpen, canvasRef }: HeaderProps) {
  const [isSaveAsOpen, setIsSaveAsOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [imageData, setImageData] = useState<ImageInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setImageData({
        name: file.name,
        type: file.type,
        size: file.size,
        width: img.width,
        height: img.height,
      });
      onOpen(img);
    };
    img.src = URL.createObjectURL(file);
  }

  function handleSave(filename: string, type: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }, type);
  }

    function handleTransform(operation: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const form = new FormData()
      form.append("file", blob, "image.png")

      const response = await fetch("/api/transform/" + operation, {
        method: "POST",
        body: form,
      });
      const resultBlob = await response.blob();
      
      const img = new Image();
      img.onload = () => onOpen(img);
      img.src = URL.createObjectURL(resultBlob);
    });
  }


      

  return (
    <header className="header">
      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <img src="/logo.svg" alt="PhotoEdit" width={32} height={32} />
      <span>PhotoEdit</span>
      <Menu
        label="File"
        items={[
          { label: "Open", onClick: () => fileInputRef.current?.click() },
          {
            label: "Save",
            onClick: () => handleSave("image.png", "image/png"),
          },
          { label: "Save as", onClick: () => setIsSaveAsOpen(true) },
          { label: "Properties", onClick: () => setIsPropertiesOpen(true)}
        ]}
      />
      <Menu 
        label="Image"
        items={[
          { label: "Rotate left", onClick: () => handleTransform("rotate_left") },
          { label: "Rotate right", onClick: () => handleTransform("rotate_right") },
          { label: "Flip horizontal", onClick: () => handleTransform("flip_horizontal") },
          { label: "Flip vertical", onClick: () => handleTransform("flip_vertical") },
        ]}
      />
      {isSaveAsOpen && (
        <SaveAsDialog
          onSave={(filename, type) => {
            handleSave(filename, type);
            setIsSaveAsOpen(false);
          }}
          onCancel={() => setIsSaveAsOpen(false)}
        />
      )}
      {isPropertiesOpen && (
        <PropertiesDialog 
        info={imageData}
        onClose={() => setIsPropertiesOpen(false)}/>
      )}
    </header>
  );
}

export default Header;
