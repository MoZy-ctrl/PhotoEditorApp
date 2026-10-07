import { useEffect, useRef, useState } from "react";

function CanvasArea() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [image, setImage] = useState<HTMLImageElement | null>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        const img = new Image()
        img.onload = () => setImage(img)
        img.src = URL.createObjectURL(file)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !image) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return
        
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)
    }, [image])

    return (
        <section className="canvas-area">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <canvas ref={canvasRef} />
        </section>
    )
}

export default CanvasArea