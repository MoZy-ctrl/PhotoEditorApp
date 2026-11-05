import { useState } from "react";
import "../Dialog.css";

type NewDialogProps = {
  onNew: (width: number, height: number, color: string) => void;
  onClose: () => void;
};

function NewDialog({ onNew, onClose }: NewDialogProps) {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="backdrop">
      <section className="dialog">
        <label> enter width:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        ></input>
        <label> enter height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        ></input>
        <label> enter color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        ></input>

        <button onClick={() => onNew(width, height, color)}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </section>
    </div>
  );
}

export default NewDialog;
