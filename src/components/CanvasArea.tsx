import { useEffect, useRef } from "react";
import type { Selection, Tool } from "../types";

type CanvasAreaProps = {
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: string;
  brushSize: number;
  onDraw: () => void;
  tool: Tool;
  selection: Selection | null;
  onSelectionChange: (selection: Selection | null) => void;
};

function CanvasArea({
  image,
  canvasRef,
  color,
  brushSize,
  onDraw,
  tool,
  selection,
  onSelectionChange,
}: CanvasAreaProps) {
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const selectionStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSelectionChange(null);
    if (!image) {
      canvas.width = 0;
      canvas.height = 0;
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);
  function getPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    return {
      x: Math.max(0, Math.min(canvas.width, x)),
      y: Math.max(0, Math.min(canvas.height, y)),
    };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (tool === "select") {
      selectionStart.current = getPos(e);
      onSelectionChange(null);
      return;
    }
    onDraw();
    isDrawing.current = true;
    lastPos.current = getPos(e);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (tool === "select") {
      const start = selectionStart.current;
      if (!start) return;
      const pos = getPos(e);
      onSelectionChange({
        x: Math.round(Math.min(start.x, pos.x)),
        y: Math.round(Math.min(start.y, pos.y)),
        width: Math.round(Math.abs(pos.x - start.x)),
        height: Math.round(Math.abs(pos.y - start.y)),
      });
      return;
    }

    if (!isDrawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDrawing() {
    isDrawing.current = false;
    selectionStart.current = null;
  }

  return (
    <section className="canvas-area">
      <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        style={{ cursor: tool === "select" ? "crosshair" : "default" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      {selection && image && selection.width > 0 && selection.height > 0 && (
        <div
          className="selection"
          style={{
            left: `${(selection.x / image.width) * 100}%`,
            top: `${(selection.y / image.height) * 100}%`,
            width: `${(selection.width / image.width) * 100}%`,
            height: `${(selection.height / image.height) * 100}%`,
          }}
        />
      )}
      </div>
    </section>
  );
}

export default CanvasArea;
