import { useRef, useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import type { Selection, Tool } from "./types";

function App() {
  const [selectedColor, setSelectedColor] = useState("#E2553B");
  const [brushSize, setBrushSize] = useState(10);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [undoStack, setUndoStack] = useState<HTMLImageElement[]>([]);
  const [redoStack, setRedoStack] = useState<HTMLImageElement[]>([]);
  const [tool, setTool] = useState<Tool>("brush");
  const [selection, setSelection] = useState<Selection | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function processImage(path: string, params?: Record<string, string | number>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    pushHistory();

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const form = new FormData();
      form.append("file", blob, "image.png");

      if (params) {
        for (const [key, value] of Object.entries(params)) {
          form.append(key, value.toString());
        }
      }

      const response = await fetch("/api/" + path, {
        method: "POST",
        body: form,
      });
      if (!response.ok) return;
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

  function crop() {
    if (!selection || selection.width < 1 || selection.height < 1) return;
    processImage("crop", selection);
    setSelection(null);
  }

  return (
    <div className="app">
      <Header
        onOpen={setImage}
        onQuit={() => setImage(null)}
        onProcess={processImage}
        onUndo={undo}
        onRedo={redo}
        onCrop={crop}
        canvasRef={canvasRef}
      />
      <main className="workspace">
        <CanvasArea
          image={image}
          canvasRef={canvasRef}
          color={selectedColor}
          brushSize={brushSize}
          onDraw={pushHistory}
          tool={tool}
          selection={selection}
          onSelectionChange={setSelection}
        />
        <Sidebar
          onProcess={processImage}
          color={selectedColor}
          onColorChange={setSelectedColor}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          tool={tool}
          onToolChange={setTool}
        />
      </main>
    </div>
  );
}

export default App;
