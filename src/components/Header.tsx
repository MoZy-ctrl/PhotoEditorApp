import { useRef, useState } from "react";
import Menu from "./Menu";
import SaveAsDialog from "./SaveAsDialog";
import PropertiesDialog from "./PropertiesDialog";
import NewDialog from "./NewDialog";
import QuitDialog from "./QuitDialog";
import ResizeDialog from "./ResizeDialog";

type HeaderProps = {
  onOpen: (img: HTMLImageElement) => void;
  onQuit: () => void;
  onProcess: (path: string, params?: Record<string, string | number>) => void;
  onUndo: () => void;
  onRedo: () => void;
  onCrop: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};
export type ImageInfo = {
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
};

function Header({ onOpen, onQuit, onProcess, onUndo, onRedo, onCrop, canvasRef }: HeaderProps) {
  const [isSaveAsOpen, setIsSaveAsOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isQuitOpen, setIsQuitOpen] = useState(false);
  const [imageData, setImageData] = useState<ImageInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isResizeOpen, setIsResizeOpen] = useState(false);

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

  function handleNew(width: number, height: number, color: string) {
    console.log("Width: " + width);
    console.log("height: " + height);
    console.log("color: " + color);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;

    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.onload = () => {
      setImageData({
        name: "untitled",
        type: "image/png",
        size: 0,
        width: width,
        height: height,
      });
      onOpen(img);
    };
    img.src = tempCanvas.toDataURL();
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
          { label: "New", onClick: () => setIsNewOpen(true) },
          { label: "Open", onClick: () => fileInputRef.current?.click() },
          {
            label: "Save",
            onClick: () => handleSave("image.png", "image/png"),
          },
          { label: "Save as", onClick: () => setIsSaveAsOpen(true) },
          { label: "Properties", onClick: () => setIsPropertiesOpen(true) },
          { label: "Quit", onClick: () => setIsQuitOpen(true) },
        ]}
      />
      <Menu
        label="Image"
        items={[
          {
            label: "Rotate left",
            onClick: () => onProcess("transform/rotate_left"),
          },
          {
            label: "Rotate right",
            onClick: () => onProcess("transform/rotate_right"),
          },
          {
            label: "Flip horizontal",
            onClick: () => onProcess("transform/flip_horizontal"),
          },
          {
            label: "Flip vertical",
            onClick: () => onProcess("transform/flip_vertical"),
          },
          {
            label: "Resize",
            onClick: () => setIsResizeOpen(true),
          },
          {
            label: "Crop",
            onClick: () => onCrop(),
          },
        ]}
      />
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>
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
          onClose={() => setIsPropertiesOpen(false)}
        />
      )}
      {isNewOpen && (
        <NewDialog
          onNew={(width, height, color) => {
            handleNew(width, height, color);
            setIsNewOpen(false);
          }}
          onClose={() => setIsNewOpen(false)}
        ></NewDialog>
      )}
      {isQuitOpen && (
        <QuitDialog
          onConfirm={() => {
            onQuit();
            setImageData(null);
            setIsQuitOpen(false);
          }}
          onCancel={() => setIsQuitOpen(false)}
        />
      )}
      {isResizeOpen && canvasRef.current && (
        <ResizeDialog
          initialWidth={canvasRef.current.width}
          initialHeight={canvasRef.current.height}
          onResize={(width, height, interpolation) => {
            onProcess("resize", { width, height, interpolation });
            setIsResizeOpen(false);
          }}
          onClose={() => setIsResizeOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
