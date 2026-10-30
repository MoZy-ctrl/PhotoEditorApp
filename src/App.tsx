import { useEffect, useRef, useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [data, setData] = useState();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function checkHealth() {
      const response = await fetch("/api/health");
      const json = await response.json();
      console.log(json);
    }
    checkHealth();
  }, []);

  return (
    <div className="app">
      <Header onOpen={setImage} canvasRef={canvasRef} />
      <main className="workspace">
        <CanvasArea image={image} canvasRef={canvasRef} />
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
