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
  onColorPick: (color: string) => void;
  zoom: number;
  fillColor: string | null;
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
  onColorPick,
  zoom,
  fillColor,
}: CanvasAreaProps) {
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const selectionStart = useRef<{ x: number; y: number } | null>(null);
  const shapeStart = useRef<{ x: number; y: number } | null>(null);
  const snapshot = useRef<ImageData | null>(null);
  const isShape = tool === "rect" || tool === "ellipse" || tool === "line";

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

  function drawShape(
    ctx: CanvasRenderingContext2D,
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) {
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (tool === "rect") {
      ctx.rect(a.x, a.y, b.x - a.x, b.y - a.y);
    } else if (tool === "ellipse") {
      ctx.ellipse(
        (a.x + b.x) / 2,
        (a.y + b.y) / 2,
        Math.abs(b.x - a.x) / 2,
        Math.abs(b.y - a.y) / 2,
        0,
        0,
        Math.PI * 2,
      );
    } else {
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    if (fillColor && tool !== "line") {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.stroke();
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isShape) {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      onDraw();
      shapeStart.current = getPos(e);
      snapshot.current = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height,
      );
      return;
    }
    if (tool === "picker") {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const pos = getPos(e);
      const x = Math.min(Math.floor(pos.x), ctx.canvas.width - 1);
      const y = Math.min(Math.floor(pos.y), ctx.canvas.height - 1);
      const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
      const hex =
        "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
      onColorPick(hex);
      return;
    }
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
    if (isShape) {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !shapeStart.current || !snapshot.current) return;
      ctx.putImageData(snapshot.current, 0, 0);
      drawShape(ctx, shapeStart.current, getPos(e));
      return;
    }
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
    const pattern = image ? ctx.createPattern(image, "no-repeat") : null;
    ctx.strokeStyle = tool === "eraser" && pattern ? pattern : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDrawing() {
    shapeStart.current = null;
    snapshot.current = null;
    isDrawing.current = false;
    selectionStart.current = null;
  }

  return (
    <section className="canvas-area">
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          style={{
            cursor:
              tool === "select" || tool === "picker" || isShape
                ? "crosshair"
                : "default",
            width: image ? image.width * zoom : 0,
          }}
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
