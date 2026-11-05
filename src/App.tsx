import { useRef, useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function processImage(path: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

  return (
    <div className="app">
      <Header
        onOpen={setImage}
        onQuit={() => setImage(null)}
        onProcess={processImage}
        canvasRef={canvasRef}
      />
      <main className="workspace">
        <CanvasArea image={image} canvasRef={canvasRef} />
        <Sidebar onProcess={processImage} />
      </main>
    </div>
  );
}

export default App;