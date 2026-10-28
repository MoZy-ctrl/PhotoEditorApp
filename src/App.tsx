import { useState } from "react";
import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);


  return (
    <div className="app">
      <Header onOpen={setImage} />
      <main className="workspace">
        <CanvasArea image={image} />
        <Sidebar />
        
      </main>
    </div>
  );
}

export default App;
