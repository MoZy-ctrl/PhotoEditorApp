import type { Tool } from "../types";

type SidebarProps = {
  onProcess: (path: string) => void;
  color: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (brushSize: number) => void;
  tool: Tool;
  onToolChange: (tool: Tool) => void;
  fillColor: string | null;
  onFillColorChange: (color: string | null) => void;
};

const COLORS = [
  "#1C1E23",
  "#FFFFFF",
  "#E2553B",
  "#F2A541",
  "#FFC857",
  "#4E9A5A",
  "#2E4FC7",
  "#8A4FBF",
];

function Sidebar({
  onProcess,
  color,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  tool,
  onToolChange,
  fillColor,
  onFillColorChange,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <section className="panel">
        <h2>Tools</h2>
        <div className="tool-buttons">
          {(["brush", "eraser", "select", "picker"] as Tool[]).map((t) => (
            <button
              key={t}
              className={tool === t ? "selected" : ""}
              onClick={() => onToolChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Shapes</h2>
        <div className="tool-buttons shape-buttons">
          {(
            [
              ["rect", "▭"],
              ["ellipse", "◯"],
              ["line", "╱"],
            ] as [Tool, string][]
          ).map(([t, icon]) => (
            <button
              key={t}
              className={tool === t ? "selected" : ""}
              onClick={() => onToolChange(t)}
              title={t}
            >
              {icon}
            </button>
          ))}
        </div>
        <label className="fill-row">
          <input
            type="checkbox"
            checked={fillColor !== null}
            onChange={(e) => onFillColorChange(e.target.checked ? color : null)}
          />
          Fill
          {fillColor !== null && (
            <input
              type="color"
              value={fillColor}
              onChange={(e) => onFillColorChange(e.target.value)}
            />
          )}
        </label>
        <p className="hint">Outline uses the selected colour and brush size</p>
      </section>
      <section className="panel">
        <h2>Colors</h2>
        <div className="swatches">
          {COLORS.map((swatch) => (
            <button
              key={swatch}
              className={swatch === color ? "swatch selected" : "swatch"}
              style={{ backgroundColor: swatch }}
              onClick={() => onColorChange(swatch)}
              aria-label={`Choose color ${swatch}`}
            />
          ))}
        </div>
        <div className="color-preview">
          <span style={{ backgroundColor: color }} />
          {color}
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
        />
        <p>Brush size: {brushSize} px</p>
      </section>

      <section className="panel">
        <h2>Filters</h2>
        <button onClick={() => onProcess("filters/binary")}>Binary</button>
        <button onClick={() => onProcess("filters/gaussian")}>Gaussian</button>
        <button onClick={() => onProcess("filters/sobel")}>Sobel</button>
        <button onClick={() => onProcess("filters/otsu")}>Otsu</button>
      </section>

      <section className="panel">
        <h2>Layers</h2>
      </section>
    </aside>
  );
}

export default Sidebar;
