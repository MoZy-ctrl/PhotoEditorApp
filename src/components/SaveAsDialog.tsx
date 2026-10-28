import { useState } from "react";
import "../SaveAsDialog.css";

type SaveAsDialogProps = {
  onSave: (filename: string, type: string) => void;
  onCancel: () => void;
};

function SaveAsDialog({ onSave, onCancel }: SaveAsDialogProps) {
  const [filename, setFilename] = useState("image");
  const [format, setFormat] = useState("image/png");

  const end = format === "image/png" ? "png" : "jpg";

  return (
    <div className="backdrop">
      <section className="dialog">
        <label> enter filename:</label>
        <input
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        ></input>
        <label>Select format: </label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
        </select>
        <button onClick={() => onSave(filename + "." + end, format)}>Save as</button>
        <button onClick={onCancel}>Cancel</button>
      </section>
    </div>
  );
}

export default SaveAsDialog;
