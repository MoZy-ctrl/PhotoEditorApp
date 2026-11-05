import { useEffect } from "react";

type CanvasAreaProps = {
  image: HTMLImageElement | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

function CanvasArea({ image, canvasRef }: CanvasAreaProps) {
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

  return (
  <section className="canvas-area">
    <canvas ref={canvasRef} />
  </section>
);
}

export default CanvasArea;
