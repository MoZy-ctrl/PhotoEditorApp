import "./App.css";
import CanvasArea from "./components/CanvasArea";
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="workspace">
      <CanvasArea />
      <Sidebar />
      </main>
    </div>
  );
}

export default App;
