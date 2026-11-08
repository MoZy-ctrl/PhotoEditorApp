import { useState } from "react";
import "../Dialog.css";

type ResizeDialogProps = {
    initialWidth: number;
    initialHeight: number;
  onResize: (width: number, height: number, interpolation: string) => void;
  onClose: () => void;
};

function ResizeDialog({ initialWidth, initialHeight, onResize, onClose }: ResizeDialogProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [lockedAspectRatio, setLockedAspectRatio] = useState(true);
  const [selectedInterpolation, setSelectedInterpolation] = useState("bilinear");
  
  const aspectRatio = initialWidth / initialHeight;

  function handleWidthChange(value: number) {
    setWidth(value);
    if (lockedAspectRatio) setHeight(Math.max(1, Math.round(value / aspectRatio)));
  }

  function handleHeightChange(value: number) {
    setHeight(value);
    if (lockedAspectRatio) setWidth(Math.max(1, Math.round(value * aspectRatio)));
  }

  const isValid = width >= 1 && height <= 10000 && height >= 1 && height <= 10000;

  return (
    <div className="backdrop">
      <section className="dialog">
        <label>Enter width:</label>
        <input
          type="number"
          value={width}
          min={1}
          max={10000}
          onChange={(e) => handleWidthChange(Number(e.target.value))}
        />
        <label>Enter height:</label>
        <input
          type="number"
          value={height}
          min={1}
          max={10000}
          onChange={(e) => handleHeightChange(Number(e.target.value))}
        />
        <label>
          <input
            type="checkbox"
            checked={lockedAspectRatio}
            onChange={(e) => setLockedAspectRatio(e.target.checked)}
          />
          Lock aspect ratio
        </label>
        <label>Method:</label>
        <select value={selectedInterpolation} onChange={(e) => setSelectedInterpolation(e.target.value)}>
          <option value="nearest">Nearest</option>
          <option value="bilinear">Bilinear</option>
          <option value="bicubic">Bicubic</option>
          <option value="area">Area</option>
        </select>

        <button disabled={!isValid} onClick={() => onResize(width, height, selectedInterpolation)}>
          Resize
        </button>
        <button onClick={onClose}>Cancel</button>
      </section>
    </div>
  );
}

export default ResizeDialog;