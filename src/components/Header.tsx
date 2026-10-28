import { useRef } from "react";
import Menu from "./Menu"

type HeaderProps = {
    onOpen: (img: HTMLImageElement) => void
}

function Header({onOpen}: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {onOpen(img); console.log(img.width); console.log(img.height)};
    img.src = URL.createObjectURL(file);
    
  }
    return (
        <header className="header">
            <input ref={fileInputRef} hidden type="file" accept="image/*" onChange={handleFileChange} />
            <img src="/logo.svg" alt="PhotoEdit" width={32} height={32} />
            <span>PhotoEdit</span>
            <Menu 
                label="File"
                items={[
                    { label: "Open", onClick: () => fileInputRef.current?.click() },
                    { label: "Save", onClick: () => console.log("save")},
                ]}
            />
        </header>
    )
}

export default Header