import { useEffect, useRef } from "react";

type CanvasAreaProps = {
  image: HTMLImageElement | null;
};

function CanvasArea({ image }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);

  return (
  <section className="canvas-area">
    <canvas ref={canvasRef} />
  </section>
);
}

export default CanvasArea;
