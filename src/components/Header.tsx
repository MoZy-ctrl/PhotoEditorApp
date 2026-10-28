import { useRef, useState } from "react";
import Menu from "./Menu";
import SaveAsDialog from "./SaveAsDialog";

type HeaderProps = {
  onOpen: (img: HTMLImageElement) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

function Header({ onOpen, canvasRef }: HeaderProps) {
  const [isSaveAsOpen, setIsSaveAsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      onOpen(img);
      console.log(img.width);
      console.log(img.height);
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
    </header>
  );
}

export default Header;
