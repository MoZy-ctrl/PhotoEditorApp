import { useRef, useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [selectedColor, setSelectedColor] = useState("#E2553B");
  const [brushSize, setBrushSize] = useState(10);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [undoStack, setUndoStack] = useState<HTMLImageElement[]>([]);
  const [redoStack, setRedoStack] = useState<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function processImage(path: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    pushHistory();

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const form = new FormData();
      form.append("file", blob, "image.png");

      const response = await fetch("/api/" + path, {
        method: "POST",
        body: form,
      });
      const resultBlob = await response.blob();

      const img = new Image();
      img.onload = () => setImage(img);
      img.src = URL.createObjectURL(resultBlob);
    });
  }

  function saveSnapshot() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  }

  function undo() {
    if (undoStack.length === 0) return;
    const cur = saveSnapshot();
    if (cur == undefined) return;

    const prev = undoStack[undoStack.length - 1];

    setRedoStack([...redoStack, cur]);
    setImage(prev);
    setUndoStack(undoStack.slice(0, -1));
  }

  function redo() {
    if (redoStack.length === 0) return;
    const cur = saveSnapshot();
    if (cur == undefined) return;

    const prev = redoStack[redoStack.length - 1];

    setUndoStack([...undoStack, cur]);
    setImage(prev);
    setRedoStack(redoStack.slice(0, -1));
  }

  function pushHistory() {
    const cur = saveSnapshot();
    if (cur == undefined) return;
    setUndoStack([...undoStack, cur]);
    setRedoStack([]);
  }

  return (
    <div className="app">
      <Header
        onOpen={setImage}
        onQuit={() => setImage(null)}
        onProcess={processImage}
        onUndo={undo}
        onRedo={redo}
        canvasRef={canvasRef}
      />
      <main className="workspace">
        <CanvasArea
          image={image}
          canvasRef={canvasRef}
          color={selectedColor}
          brushSize={brushSize}
          onDraw={pushHistory}
        />
        <Sidebar
          onProcess={processImage}
          color={selectedColor}
          onColorChange={setSelectedColor}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
      </main>
    </div>
  );
}

export default App;
