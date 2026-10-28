import { useRef, useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


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
