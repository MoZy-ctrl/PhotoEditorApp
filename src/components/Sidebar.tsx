type SidebarProps = {
  onProcess: (path: string) => void;
  color: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (brushSize: number) => void;
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
}: SidebarProps) {
  return (
    <aside className="sidebar">
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
        <p>Selected: {color}</p>
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
