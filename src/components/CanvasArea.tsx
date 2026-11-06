import { useEffect, useRef } from "react";

type CanvasAreaProps = {
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: string;
  brushSize: number;
  onDraw: () => void;
};

function CanvasArea({
  image,
  canvasRef,
  color,
  brushSize,
  onDraw,
}: CanvasAreaProps) {
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    onDraw();
    isDrawing.current = true;
    lastPos.current = getPos(e);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
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
  }

  return (
    <section className="canvas-area">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </section>
  );
}

export default CanvasArea;
