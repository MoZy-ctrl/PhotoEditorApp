import { useEffect, useRef, useState } from "react";
import "../App.css";

export type MenuItem = {
  label: string;
  onClick: () => void;
};

type MenuProps = {
  label: string;
  items: MenuItem[];
};

function Menu({ label, items }: MenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lukk menyen når man klikker et sted utenfor den
  useEffect(() => {
    if (!isVisible) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  return (
    <div className="menu" ref={menuRef}>
      <button
        className={isVisible ? "menu-button open" : "menu-button"}
        onClick={() => setIsVisible(!isVisible)}
      >
        {label}
      </button>
      {isVisible && (
        <ul className="menu-list">
          {items.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => {
                  item.onClick();
                  setIsVisible(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
